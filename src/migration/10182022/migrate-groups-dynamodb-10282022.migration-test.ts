// /* eslint-disable no-restricted-imports */
// import { DocumentClientTypes } from "@typedorm/document-client";
// import { testGroupsMigration, dataMigration } from "../migration-test-groups";
// import { migrateGroupsProperties } from "./migrate-groups-dynamodb-10282022";
// import { MemoryFileStore } from "infrastructure/file-store/memory-file-store";
// import {
//   createGroupsEntityManager,
//   GroupModel,
//   GroupModelLatest,
// } from "infrastructure/group-store";
// import { MemoryLogger } from "infrastructure/logger/memory-logger";
// import { getLocalDocumentClient, resetDB } from "infrastructure/utils";
// import { GroupMetadata } from "topics/group";

// describe("Test migration", () => {
//   let latestsGroupsItems: {
//     items: GroupModelLatest[];
//     cursor?: DocumentClientTypes.Key | undefined;
//   };
//   const dynamodbClient = getLocalDocumentClient();
//   const entityManager = createGroupsEntityManager({
//     documentClient: dynamodbClient,
//     prefix: "test-",
//   });
//   const dataFileStore = new MemoryFileStore("test");
//   const testGroups = testGroupsMigration;

//   const createGroup = async (group: GroupMetadata) => {
//     const groupMain = GroupModel.fromGroupMetadata(group);
//     return entityManager.create(groupMain, {
//       overwriteIfExists: true,
//     });
//   };

//   const createGroupLatest = async (group: GroupMetadata) => {
//     const groupLatest = GroupModelLatest.fromGroupMetadata(group);
//     return entityManager.create(groupLatest, {
//       overwriteIfExists: true,
//     });
//   };

//   const filename = (group: GroupMetadata) =>
//     `${group.name}/${group.timestamp}.json`;

//   beforeEach(async () => {
//     await resetDB(dynamodbClient);
//     dataFileStore.reset();
//     await createGroup(testGroups.group1_0);
//     await createGroup(testGroups.group1_1);
//     await createGroup(testGroups.group2_0);
//     await createGroupLatest(testGroups.group1_1);
//     await createGroupLatest(testGroups.group2_0);
//     dataFileStore.write(filename(testGroups.group1_0), dataMigration.group1_0);
//     dataFileStore.write(filename(testGroups.group1_1), dataMigration.group1_1);
//     dataFileStore.write(filename(testGroups.group2_0), dataMigration.group2_0);

//     latestsGroupsItems = await entityManager.find(
//       GroupModelLatest,
//       {},
//       {
//         queryIndex: "GSI1",
//       }
//     );
//   });

//   it("should check the initial metadata of groups", async () => {
//     const groups: GroupModel[] = [];
//     for (const group of latestsGroupsItems.items) {
//       const allGroups = await entityManager.find(GroupModel, {
//         name: group.name,
//       });
//       for (const groupGenerated of allGroups.items) {
//         groups.push(groupGenerated);
//       }
//     }
//     expect(groups).toHaveLength(3);

//     expect(groups).toEqual(
//       expect.arrayContaining([
//         testGroups.group1_0,
//         testGroups.group1_1,
//         testGroups.group2_0,
//       ])
//     );
//   });

//   it("should migrate groups", async () => {
//     await migrateGroupsProperties({
//       dataFileStore,
//       entityManager,
//       loggerService: new MemoryLogger(),
//     });

//     const groupsItems = await entityManager.find(GroupModel, {
//       name: testGroups.group1_0.name,
//     });

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const groups = groupsItems.items.map((group) => {
//       return group.toGroupMetadata();
//     });

//     // expect(groups[0].properties?.accountsNumber).toEqual(3);
//     // expect(groups[1].properties?.accountsNumber).toEqual(4);

//     // expect(groups[0].properties?.valueDistribution).toEqual({
//     //   "1": 1,
//     //   "3": 1,
//     //   "15": 1,
//     // });
//     // expect(groups[1].properties?.valueDistribution).toEqual({
//     //   "1": 3,
//     //   "15": 1,
//     // });
//   });
// });
