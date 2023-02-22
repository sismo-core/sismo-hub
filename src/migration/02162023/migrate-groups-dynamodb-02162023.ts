// import { createHash } from "crypto";
// import { EntityManager } from "@typedorm/core";
// import { v4 as uuid } from "uuid";
// import { FileStore } from "file-store";
// import {
//   GroupSnapshotModel,
//   GroupSnapshotModelLatest,
// } from "infrastructure/group-snapshot/group-snapshot.entity";
// import { GroupModel, GroupModelLatest } from "infrastructure/group-store";
// import { GroupV2Model } from "infrastructure/group-store/groups-v2.entity";
// import { LoggerService } from "logger/logger";
// import { FetchedData, Group, GroupMetadata, Properties } from "topics/group";
// import {
//   groupSnapshotMetadata,
//   GroupSnapshotMetadata,
//   ResolvedGroupSnapshotWithData,
// } from "topics/group-snapshot";

// const filename = (groupSnapshot: GroupSnapshotMetadata) => {
//   return `${groupSnapshot.groupId}/${groupSnapshot.timestamp}.json`;
// };

// export const groupFilename = (group: GroupMetadata) => {
//   return `${group.name}/${group.timestamp}.json`;
// };

// const resolvedFilename = (groupSnapshot: GroupSnapshotMetadata) => {
//   return `${groupSnapshot.groupId}/${groupSnapshot.timestamp}.resolved.json`;
// };

// export const groupResolvedFilename = (group: GroupMetadata) => {
//   return `${group.name}/${group.timestamp}.resolved.json`;
// };

// export const migrateGroupsToV2AndSaveSnapshots = async ({
//   entityManager,
//   entityManagerV2,
//   entityManagerSnapshot,
//   dataFileStore,
//   dataFileStoreSnapshot,
//   loggerService,
// }: {
//   entityManager: EntityManager;
//   entityManagerV2: EntityManager;
//   entityManagerSnapshot: EntityManager;
//   dataFileStore: FileStore;
//   dataFileStoreSnapshot: FileStore;
//   loggerService: LoggerService;
// }) => {
//   // retrieve past groups
//   const latestsGroupsItems = await entityManager.find(
//     GroupModelLatest,
//     {},
//     {
//       queryIndex: "GSI1",
//     }
//   );

//   const ids: { [name: string]: string } = {};

//   let counter = 0;
//   for (const groupModel of latestsGroupsItems.items) {
//     // create new id for group v2
//     const groupMetadata = groupModel.toGroupMetadata();
//     const id = uuid();
//     ids[groupMetadata.name] = id;

//     loggerService.info("migrating group", groupMetadata.name, "to v2");
//     loggerService.info(`${counter++}/${latestsGroupsItems.items.length}`);

//     const existingV2 = await entityManagerV2.find(
//       GroupV2Model,
//       {
//         name: groupModel.name,
//       },
//       { queryIndex: "GSI1" }
//     );
//     if (existingV2.items.length > 0 && existingV2.items[0].id) {
//       loggerService.info("group", groupMetadata.name, "already migrated to v2");
//       continue;
//     }

//     const allGroups = await entityManager.find(GroupModel, {
//       name: groupMetadata.name,
//     });

//     const saveGroupSnapshotProms = allGroups.items.map((groupGenerated) =>
//       saveGroupSnapshot({
//         entityManager: entityManagerSnapshot,
//         dataFileStoreSnapshot,
//         group: _fromGroupModelToGroup(groupGenerated, dataFileStore),
//         id,
//         loggerService,
//         isLatestSaved: false,
//       })
//     );
//     await Promise.all(saveGroupSnapshotProms);

//     // saving at the end when all group snapshot are firstly made
//     // create new group v2 (latest and main model)
//     const group = await saveGroupV2({
//       entityManager: entityManagerV2,
//       dataFileStore,
//       groupMetadata,
//       id,
//       loggerService,
//     });

//     // create group snapshot
//     await saveGroupSnapshot({
//       entityManager: entityManagerSnapshot,
//       dataFileStoreSnapshot,
//       group,
//       id,
//       loggerService,
//     });
//   }

//   return ids;
// };

// const saveGroupV2 = async ({
//   entityManager,
//   dataFileStore,
//   groupMetadata,
//   id,
//   loggerService,
// }: {
//   entityManager: EntityManager;
//   dataFileStore: FileStore;
//   groupMetadata: GroupMetadata;
//   id: string;
//   loggerService: LoggerService;
// }): Promise<Group> => {
//   const groupMetadataAndId = {
//     ...groupMetadata,
//     id,
//   };

//   const newGroupModel: GroupV2Model = await entityManager.create(
//     GroupV2Model.fromGroupMetadataAndId(groupMetadataAndId),
//     {
//       overwriteIfExists: true,
//     }
//   );

//   loggerService.info("Created group v2", {
//     group: groupMetadataAndId,
//   });

//   return _fromGroupModelToGroup(newGroupModel, dataFileStore);
// };

// const saveGroupSnapshot = async ({
//   entityManager,
//   dataFileStoreSnapshot,
//   group,
//   id,
//   isLatestSaved = true,
//   loggerService,
// }: {
//   entityManager: EntityManager;
//   dataFileStoreSnapshot: FileStore;
//   group: Group;
//   id: string;
//   isLatestSaved?: boolean;
//   loggerService: LoggerService;
// }) => {
//   const groupSnapshot = {
//     groupId: id,
//     name: group.name,
//     timestamp: group.timestamp,
//     properties: computeProperties(await group.data()),
//     data: await group.data(),
//     resolvedIdentifierData: await group.resolvedIdentifierData(),
//   } as ResolvedGroupSnapshotWithData;

//   // save group snapshot
//   await dataFileStoreSnapshot.write(
//     filename(groupSnapshot),
//     groupSnapshot.data
//   );
//   await dataFileStoreSnapshot.write(
//     resolvedFilename(groupSnapshot),
//     groupSnapshot.resolvedIdentifierData
//   );

//   const updatedGroupSnapshotWithMD5 = await _handleMD5Checksum(
//     groupSnapshot,
//     dataFileStoreSnapshot
//   );

//   const groupSnapshotMain = GroupSnapshotModel.fromGroupSnapshotMetadata(
//     groupSnapshotMetadata(updatedGroupSnapshotWithMD5)
//   );

//   await entityManager.create(groupSnapshotMain, {
//     overwriteIfExists: true,
//   });

//   loggerService.info("Created group snapshot", {
//     groupSnapshot: groupSnapshotMetadata(updatedGroupSnapshotWithMD5),
//   });

//   if (isLatestSaved === true) {
//     const groupSnapshotLatest =
//       GroupSnapshotModelLatest.fromGroupSnapshotMetadata(
//         groupSnapshotMetadata(updatedGroupSnapshotWithMD5)
//       );
//     await entityManager.create(groupSnapshotLatest, {
//       overwriteIfExists: true,
//     });

//     loggerService.info("Created group snapshot latest", {
//       groupSnapshot: groupSnapshotMetadata(updatedGroupSnapshotWithMD5),
//     });
//   }
// };

// const _fromGroupModelToGroup = (
//   group: GroupModel | GroupV2Model,
//   dataFileStore: FileStore
// ) => {
//   let groupMetadata: GroupMetadata | (GroupMetadata & { id: string });
//   if (group instanceof GroupV2Model) {
//     groupMetadata = group.toGroupMetadataWithId();
//   } else {
//     groupMetadata = group.toGroupMetadata();
//   }

//   return {
//     ...groupMetadata,
//     data: () => dataFileStore.read(groupFilename(groupMetadata)),
//     resolvedIdentifierData: async () => {
//       if (await dataFileStore.exists(groupResolvedFilename(groupMetadata))) {
//         return dataFileStore.read(groupResolvedFilename(groupMetadata));
//       }
//       return dataFileStore.read(groupFilename(groupMetadata));
//     },
//   } as Group;
// };

// const _handleMD5Checksum = async (
//   groupSnapshot: ResolvedGroupSnapshotWithData,
//   dataFileStore: FileStore
// ): Promise<ResolvedGroupSnapshotWithData> => {
//   const integrityFormat = async (filename: string) => {
//     return (
//       "md5-" +
//       createHash("md5")
//         .update(JSON.stringify(await dataFileStore.read(filename)).toString())
//         .digest("hex")
//     );
//   };

//   return {
//     ...groupSnapshot,
//     dataIntegrity: await integrityFormat(filename(groupSnapshot)),
//     resolvedIdentifierDataIntegrity: await integrityFormat(
//       resolvedFilename(groupSnapshot)
//     ),
//   };
// };

// const computeProperties = (data: FetchedData): Properties => {
//   const valueDistribution: { [tier: number]: number } = {};
//   let accountsNumber = 0;
//   Object.values(data).map((tier: any) => {
//     const tierString = tier;
//     valueDistribution[tierString]
//       ? (valueDistribution[tierString] += 1)
//       : (valueDistribution[tierString] = 1);
//     accountsNumber++;
//   });

//   return {
//     accountsNumber,
//     valueDistribution,
//   };
// };
