// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DocumentClientV3 } from "@typedorm/document-client";
// import { migrateGroupsProperties } from "./migrate-groups-dynamodb-10282022";
// import { S3FileStore } from "infrastructure/file-store";
// import { createGroupsEntityManager } from "infrastructure/group-store";
// import { StdoutLogger } from "infrastructure/logger/stdout-logger";

// const main = async () => {
//   if (!process.env.SH_DYNAMO_GLOBAL_TABLE_NAME) {
//     return;
//   }
//   await migrateGroupsProperties({
//     entityManager: createGroupsEntityManager({
//       documentClient: new DocumentClientV3(new DynamoDBClient({})),
//       globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
//       prefix: "script-",
//     }),
//     dataFileStore: new S3FileStore("group-store", {
//       bucketName: process.env.SH_S3_DATA_BUCKET_NAME,
//       endpoint: process.env.SH_S3_DATA_ENDPOINT,
//     }),
//     loggerService: new StdoutLogger(),
//   });
// };

// main();
