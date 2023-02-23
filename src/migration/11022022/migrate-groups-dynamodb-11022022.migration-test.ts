// import { DocumentClientTypes } from "@typedorm/document-client";
// // eslint-disable-next-line no-restricted-imports
// import { testGroupsMigration } from "../migration-test-groups";
// import { migrateGroupsGeneratedBy } from "./migrate-groups-dynamodb-11022022";
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

//   beforeEach(async () => {
//     await resetDB(dynamodbClient);
//     await createGroup(testGroups.group1_0);
//     await createGroup(testGroups.group1_1);
//     await createGroup(testGroups.group2_0);
//     await createGroupLatest(testGroups.group1_1);
//     await createGroupLatest(testGroups.group2_0);

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
//     await migrateGroupsGeneratedBy({
//       entityManager,
//       loggerService: new MemoryLogger(),
//     });

//     const groupsItems = await entityManager.find(GroupModel, {
//       name: testGroups.group1_0.name,
//     });

//     const groups = groupsItems.items.map((group) => {
//       return group.toGroupMetadata();
//     });

//     expect(groups).toHaveLength(2);
//     expect(groups[0].generatedBy).toEqual("test-group-generator-1");
//     expect(groups[1].generatedBy).toEqual("test-group-generator-1");
//   });
// });
