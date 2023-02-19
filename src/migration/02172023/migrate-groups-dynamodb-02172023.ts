import { EntityManager } from "@typedorm/core";
import { BigNumber } from "ethers/lib/ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
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

    const newId = await getNewId(groupMetadataWithId.name, newIds);

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
    const groupMain = GroupV2Model.fromGroupMetadataAndId({
      ...groupMetadataWithId,
      id: newId,
    });
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

    const deletedGroupSnapshotProms = allGroupSnapshots.items.map(
      (groupSnapshot) =>
        deleteGroupSnapshot({
          entityManager: entityManagerSnapshot,
          groupSnapshot: GroupSnapshotModel.fromGroupSnapshotMetadata({
            ...groupSnapshot,
            groupId: groupMetadataWithId.id,
          }),
          loggerService,
        })
    );
    await Promise.all(deletedGroupSnapshotProms);
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
};

const deleteGroupSnapshot = async ({
  entityManager,
  groupSnapshot,
  loggerService,
}: {
  entityManager: EntityManager;
  groupSnapshot: GroupSnapshotMetadata;
  loggerService: LoggerService;
}) => {
  await entityManager.delete(GroupSnapshotModel, {
    groupId: groupSnapshot.groupId,
    timestamp: groupSnapshot.timestamp,
  });

  // delete previous group snapshot latest
  await entityManager.delete(GroupSnapshotModelLatest, {
    groupId: groupSnapshot.groupId,
    timestamp: groupSnapshot.timestamp,
  });

  loggerService.info(
    "Successfully deleted previous group snapshot and group snapshot latest",
    {
      groupSnapshot,
    }
  );
};

const getNewId = async (
  name: string,
  newIds: { [name: string]: { previousId: string; newId: string } }
): Promise<string> => {
  const UINT128_MAX = BigNumber.from(2).pow(128).sub(1);
  const nameHash = BigNumber.from(keccak256(toUtf8Bytes(name)));
  let newId = nameHash.mod(UINT128_MAX).toHexString();

  const groupWithSameId = Object.values(newIds).find(
    (group) => group.newId === newId
  );
  if (groupWithSameId) {
    newId = BigNumber.from(newId).add(1).toHexString();
  }

  return newId;
};
