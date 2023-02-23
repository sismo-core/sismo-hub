/* eslint-disable no-restricted-imports */
// import { testGroupsMigrationWithData } from "../migration-test-groups";
// import {
//   groupFilename,
//   groupResolvedFilename,
//   migrateGroupsToV2AndSaveSnapshots,
// } from "./migrate-groups-dynamodb-02162023";
// import { MemoryFileStore } from "infrastructure/file-store/memory-file-store";
// import { DynamoDBGroupSnapshotStore } from "infrastructure/group-snapshot/dynamodb-group-snapshot-store";
// import { createGroupSnapshotsEntityManager } from "infrastructure/group-snapshot/group-snapshot.entity";
// import {
//   createGroupsEntityManager,
//   DynamoDBGroupStore,
//   GroupModel,
//   GroupModelLatest,
// } from "infrastructure/group-store";
// import { createGroupsV2EntityManager } from "infrastructure/group-store/groups-v2.entity";
// import { MemoryLogger } from "infrastructure/logger/memory-logger";
// import { getLocalDocumentClient, resetDB } from "infrastructure/utils";
// import { groupMetadata, ResolvedGroupWithData } from "topics/group";

// describe("Test migration", () => {
//   const dynamodbClient = getLocalDocumentClient();
//   const entityManager = createGroupsEntityManager({
//     documentClient: dynamodbClient,
//     prefix: "test-",
//   });
//   const entityManagerV2 = createGroupsV2EntityManager({
//     documentClient: dynamodbClient,
//     prefix: "test-",
//   });
//   const entityManagerSnapshot = createGroupSnapshotsEntityManager({
//     documentClient: dynamodbClient,
//     prefix: "test-",
//   });
//   const dataFileStore = new MemoryFileStore("test-group");
//   const dataFileStoreSnapshot = new MemoryFileStore("test-snapshot");

//   const groupStore = new DynamoDBGroupStore(dataFileStore, entityManagerV2);
//   const groupSnapshotStore = new DynamoDBGroupSnapshotStore(
//     dataFileStoreSnapshot,
//     entityManagerSnapshot
//   );

//   const saveLegacyGroup = async (group: ResolvedGroupWithData) => {
//     const groupMain = GroupModel.fromGroupMetadata(groupMetadata(group));
//     await dataFileStore.write(groupFilename(group), group.data);
//     await dataFileStore.write(
//       groupResolvedFilename(group),
//       group.resolvedIdentifierData
//     );
//     await entityManager.create(groupMain);

//     const groupLatest = GroupModelLatest.fromGroupMetadata(
//       groupMetadata(group)
//     );
//     await entityManager.create(groupLatest, {
//       overwriteIfExists: true,
//     });
//   };

//   beforeEach(async () => {
//     await resetDB(dynamodbClient);
//     dataFileStore.reset();
//     await saveLegacyGroup(testGroupsMigrationWithData.group1_0);
//     await saveLegacyGroup(testGroupsMigrationWithData.group1_1);
//     await saveLegacyGroup(testGroupsMigrationWithData.group2_0);
//   });

//   it("should migrate groups into V2 and save snapshots", async () => {
//     const ids = await migrateGroupsToV2AndSaveSnapshots({
//       entityManager,
//       entityManagerV2,
//       entityManagerSnapshot,
//       dataFileStore,
//       dataFileStoreSnapshot,
//       loggerService: new MemoryLogger(),
//     });

//     const groupNames = [
//       testGroupsMigrationWithData.group1_0.name,
//       testGroupsMigrationWithData.group2_0.name,
//     ];
//     const groupsV2 = await Promise.all(
//       groupNames.map((name) => groupStore.latest(name))
//     );
//     expect(groupsV2.map((group) => group.id)).toEqual([
//       ids[groupNames[0]],
//       ids[groupNames[1]],
//     ]);

//     // check latests group snapshots
//     const latestsGroupSnapshots = await Promise.all(
//       groupsV2.map((group) => groupSnapshotStore.latestById(group.id))
//     );
//     for (let i = 0; i < latestsGroupSnapshots.length; i++) {
//       expect(latestsGroupSnapshots[i].groupId).toEqual(groupsV2[i].id);
//       expect(await latestsGroupSnapshots[i].data()).toEqual(
//         await groupsV2[i].data()
//       );
//     }

//     // check all group snapshots for ids
//     const allGroupSnapshots = await Promise.all(
//       groupsV2.map((group) => groupSnapshotStore.allByGroupId(group.id))
//     );
//     expect(allGroupSnapshots.length).toEqual(2);
//     expect(allGroupSnapshots[0].length).toEqual(2);
//     expect(allGroupSnapshots[1].length).toEqual(1);

//     expect(allGroupSnapshots[0][0].groupId).toEqual(groupsV2[0].id);
//     expect(await allGroupSnapshots[0][0].data()).toEqual(
//       await groupsV2[0].data()
//     );
//     expect(allGroupSnapshots[0][1].groupId).toEqual(groupsV2[0].id);
//     expect(await allGroupSnapshots[0][1].data()).toEqual(
//       testGroupsMigrationWithData.group1_0.data
//     ); // this data is not stored in groupV2 store

//     expect(allGroupSnapshots[1][0].groupId).toEqual(groupsV2[1].id);
//     expect(await allGroupSnapshots[1][0].data()).toEqual(
//       await groupsV2[1].data()
//     );
//   });
// });
