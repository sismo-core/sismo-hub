import { EntityManager } from "@typedorm/core";
import {
  GroupSnapshotModel,
  GroupSnapshotModelLatest,
} from "infrastructure/group-snapshot/group-snapshot.entity";
import { GroupV2Model } from "infrastructure/group-store/groups-v2.entity";
import { LoggerService } from "logger/logger";
import { GroupSnapshotMetadata } from "topics/group-snapshot";

export const changeGroupIdFromUUIDtoUint128 = async ({
  entityManagerV2,
  entityManagerSnapshot,
  loggerService,
}: {
  entityManagerV2: EntityManager;
  entityManagerSnapshot: EntityManager;
  loggerService: LoggerService;
}) => {
  // retrieve past groups
  const allGroupsItems = await entityManagerV2.find(
    GroupV2Model,
    {},
    {
      queryIndex: "GSI2",
    }
  );

  const newIds: { [name: string]: { previousId: string; newId: string } } = {};

  let counter = 0;
  for (const groupModel of allGroupsItems.items) {
    // create new id for group v2
    const groupMetadataWithId = groupModel.toGroupMetadataWithId();
    const bytesList = groupMetadataWithId.id.split("-");

    if (bytesList.length === 1) {
      loggerService.info(
        `Group ${groupMetadataWithId.name} id ${groupMetadataWithId.id} is already a uint128`
      );
      continue;
    }

    const newId =
      "0x" +
      bytesList.reduce((acc, bytes) => {
        return acc + bytes;
      });

    newIds[groupMetadataWithId.name] = {
      previousId: groupMetadataWithId.id,
      newId,
    };

    loggerService.info(
      `Updating group ${groupMetadataWithId.name} id from ${groupMetadataWithId.id} to ${newId} ...`
    );
    loggerService.info(`${counter++}/${allGroupsItems.items.length}`);

    loggerService.info(
      `Updating group snapshots groupId from id ${groupMetadataWithId.id} to newId ${newId} for group ${groupMetadataWithId.name} ...`
    );

    const allGroupSnapshots = await entityManagerSnapshot.find(
      GroupSnapshotModel,
      {
        groupId: groupMetadataWithId.id,
      }
    );

    const updatedGroupSnapshotProms = allGroupSnapshots.items.map(
      (groupSnapshot) =>
        updateGroupSnapshot({
          entityManager: entityManagerSnapshot,
          groupSnapshot: GroupSnapshotModel.fromGroupSnapshotMetadata({
            ...groupSnapshot,
            groupId: newId,
          }),
          loggerService,
        })
    );
    await Promise.all(updatedGroupSnapshotProms);

    // saving at the end when all group snapshot are firstly updated
    // create new group v2
    const groupMetadataAndId = { ...groupMetadataWithId, id: newId };
    const groupMain = GroupV2Model.fromGroupMetadataAndId(groupMetadataAndId);
    await entityManagerV2.create(groupMain, {
      overwriteIfExists: true,
    });

    loggerService.info(
      `Successfully updated group ${groupMetadataWithId.name} id from ${groupMetadataWithId.id} to ${newId}`
    );

    await entityManagerV2.delete(GroupV2Model, {
      id: groupMetadataWithId.id,
      timestamp: groupMetadataWithId.timestamp,
    });

    loggerService.info(
      `Successfully deleted previous group ${groupMetadataWithId.name} with id ${groupMetadataWithId.id}`
    );
  }

  return newIds;
};

const updateGroupSnapshot = async ({
  entityManager,
  groupSnapshot,
  loggerService,
}: {
  entityManager: EntityManager;
  groupSnapshot: GroupSnapshotMetadata;
  loggerService: LoggerService;
}) => {
  await entityManager.create(
    GroupSnapshotModel.fromGroupSnapshotMetadata(groupSnapshot),
    {
      overwriteIfExists: true,
    }
  );

  loggerService.info("Updated group snapshot", {
    groupSnapshot,
  });

  const groupSnapshotLatest =
    GroupSnapshotModelLatest.fromGroupSnapshotMetadata(groupSnapshot);
  await entityManager.create(groupSnapshotLatest, {
    overwriteIfExists: true,
  });

  loggerService.info("Updated group snapshot latest", {
    groupSnapshot,
  });

  await entityManager.delete(GroupSnapshotModel, {
    groupId: fromUint128ToUUID(groupSnapshot.groupId),
    timestamp: groupSnapshot.timestamp,
  });

  await entityManager.delete(GroupSnapshotModelLatest, {
    groupId: fromUint128ToUUID(groupSnapshotLatest.groupId),
    timestamp: groupSnapshotLatest.timestamp,
  });

  loggerService.info(
    "Successfully deleted previous group snapshot and group snapshot latest",
    {
      groupSnapshot,
    }
  );
};

const fromUint128ToUUID = (id: string): string => {
  const bytes = id.replace("0x", "").match(/.{1,2}/g);

  const concatBytes = (
    bytes: RegExpMatchArray | null,
    begin: number,
    end: number
  ) =>
    bytes?.slice(begin, end).reduce((acc, byte) => {
      return acc + byte;
    });

  // uuid format is
  // 4 bytes - 2 bytes - 2 bytes - 2 bytes - 6 bytes
  const uuid =
    concatBytes(bytes, 0, 4) +
    "-" +
    concatBytes(bytes, 4, 6) +
    "-" +
    concatBytes(bytes, 6, 8) +
    "-" +
    concatBytes(bytes, 8, 10) +
    "-" +
    concatBytes(bytes, 10, 16);

  return uuid;
};
