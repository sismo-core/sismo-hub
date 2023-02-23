import { EntityManager } from "@typedorm/core";
import { FileStore } from "file-store";
import { DynamoDBGroupSnapshotStore } from "infrastructure/group-snapshot/dynamodb-group-snapshot-store";
import { GroupSnapshotModelLatest } from "infrastructure/group-snapshot/group-snapshot.entity";
import { DynamoDBGroupStore } from "infrastructure/group-store";
import { LoggerService } from "logger/logger";
import { GroupSnapshot } from "topics/group-snapshot";

export const changeGroupIdFromUUIDtoUint128 = async ({
  entityManagerV2,
  entityManagerSnapshot,
  dataFileStoreV2,
  dataFileStoreSnapshot,
  loggerService,
}: {
  entityManagerV2: EntityManager;
  entityManagerSnapshot: EntityManager;
  dataFileStoreV2: FileStore;
  dataFileStoreSnapshot: FileStore;
  loggerService: LoggerService;
}) => {
  const groupStore = new DynamoDBGroupStore(dataFileStoreV2, entityManagerV2);
  const groupSnapshotStore = new DynamoDBGroupSnapshotStore(
    dataFileStoreSnapshot,
    entityManagerSnapshot
  );

  // retrieve past groups
  const allGroups = Object.values(await groupStore.all());

  const newIds: { [name: string]: { previousId: string; newId: string } } = {};

  let counter = 0;
  for (const group of allGroups) {
    // create new id for group v2
    const bytesList = group.id.split("-");

    if (bytesList.length === 1) {
      loggerService.info(
        `Group ${group.name} id ${group.id} is already a uint128`
      );
      continue;
    }

    const newId = await groupStore.getNewId(group.name);

    newIds[group.name] = {
      previousId: group.id,
      newId,
    };

    loggerService.info(
      `Updating group ${group.name} id from ${group.id} to ${newId} ...`
    );
    loggerService.info(`${counter++}/${allGroups.length}`);

    loggerService.info(
      `Updating group snapshots groupId from id ${group.id} to newId ${newId} for group ${group.name} ...`
    );

    const allGroupSnapshots: GroupSnapshot[] =
      await groupSnapshotStore.allByGroupId(group.id);

    const updatedGroupSnapshotProms = allGroupSnapshots.map(
      async (groupSnapshot) => {
        await groupSnapshotStore.save({
          ...groupSnapshot,
          groupId: newId,
          data: await groupSnapshot.data(),
          resolvedIdentifierData: await groupSnapshot.resolvedIdentifierData(),
        });

        loggerService.info(
          `Successfully updated group snapshot id from ${groupSnapshot.groupId} to ${newId} for group ${groupSnapshot.name} ...`
        );
      }
    );

    await Promise.all(updatedGroupSnapshotProms);

    // saving at the end when all group snapshot are firstly updated
    // the id will be correct since it is a deterministic hash of the group name
    // create new group v2
    await groupStore.save({
      ...group,
      data: await group.data(),
      resolvedIdentifierData: await group.resolvedIdentifierData(),
    });

    loggerService.info(
      `Successfully updated group ${group.name} id from ${group.id} to ${newId}`
    );

    await groupStore.delete(group);
    loggerService.info(
      `Successfully deleted previous group ${group.name} with id ${group.id}`
    );

    const deletedGroupSnapshotProms = allGroupSnapshots.map(
      async (groupSnapshot) => {
        await groupSnapshotStore.delete(groupSnapshot);

        // delete previous group snapshot latest
        await entityManagerSnapshot.delete(GroupSnapshotModelLatest, {
          groupId: groupSnapshot.groupId,
          timestamp: groupSnapshot.timestamp,
        });

        loggerService.info(
          `Successfully deleted previous group snapshot ${groupSnapshot.name} with group id ${groupSnapshot.groupId} and timestamp ${groupSnapshot.timestamp}`
        );
      }
    );
    await Promise.all(deletedGroupSnapshotProms);
  }

  return newIds;
};
