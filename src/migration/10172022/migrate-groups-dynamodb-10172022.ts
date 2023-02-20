// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { EntityManager } from "@typedorm/core";
// import { DocumentClientV3 } from "@typedorm/document-client";
// import {
//   createGroupsEntityManager,
//   GroupModel,
//   GroupModelLatest,
// } from "infrastructure/group-store";
// import { getLocalDocumentClient } from "infrastructure/utils";
// import { AccountSource } from "topics/group";

// export const migrateGroups = async (
//   test: boolean,
//   entityManager?: EntityManager
// ) => {
//   if (!entityManager) {
//     if (!test) {
//       entityManager = createGroupsEntityManager({
//         documentClient: new DocumentClientV3(new DynamoDBClient({})),
//         globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
//         prefix: "script-",
//       });
//     }
//     entityManager = createGroupsEntityManager({
//       documentClient: getLocalDocumentClient(),
//       globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
//       prefix: "script-test-",
//     });
//   }

//   const latestsGroupsItems = await entityManager.find(
//     GroupModelLatest,
//     {},
//     {
//       queryIndex: "GSI1",
//     }
//   );
//   for (const group of latestsGroupsItems.items) {
//     group.accountSources = [AccountSource.ETHEREUM];
//     await entityManager.create(group, {
//       overwriteIfExists: true,
//     });
//     const allGroups = await entityManager.find(GroupModel, {
//       name: group.name,
//     });
//     for (const groupGenerated of allGroups.items) {
//       groupGenerated.accountSources = [AccountSource.ETHEREUM];
//       await entityManager.create(groupGenerated, {
//         overwriteIfExists: true,
//       });
//     }
//   }

//   return entityManager;
// };

// const main = async () => {
//   await migrateGroups(false);
// };

// main();
