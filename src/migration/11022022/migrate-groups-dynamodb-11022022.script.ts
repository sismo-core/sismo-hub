// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DocumentClientV3 } from "@typedorm/document-client";
// import { migrateGroupsGeneratedBy } from "./migrate-groups-dynamodb-11022022";
// import { createGroupsEntityManager } from "infrastructure/group-store";
// import { StdoutLogger } from "infrastructure/logger/stdout-logger";

// const main = async () => {
//   if (!process.env.SH_DYNAMO_GLOBAL_TABLE_NAME) {
//     return;
//   }
//   await migrateGroupsGeneratedBy({
//     entityManager: createGroupsEntityManager({
//       documentClient: new DocumentClientV3(new DynamoDBClient({})),
//       globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
//       prefix: "script-",
//     }),
//     loggerService: new StdoutLogger(),
//   });
// };

// main();
