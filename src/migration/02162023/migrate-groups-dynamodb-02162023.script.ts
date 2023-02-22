// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DocumentClientV3 } from "@typedorm/document-client";
// import { migrateGroupsToV2AndSaveSnapshots } from "./migrate-groups-dynamodb-02162023";
// import { S3FileStore } from "infrastructure/file-store";
// import { createGroupSnapshotsEntityManager } from "infrastructure/group-snapshot/group-snapshot.entity";
// import { createGroupsEntityManager } from "infrastructure/group-store";
// import { createGroupsV2EntityManager } from "infrastructure/group-store/groups-v2.entity";
// import { StdoutLogger } from "infrastructure/logger/stdout-logger";

// const main = async () => {
//   if (!process.env.SH_DYNAMO_GLOBAL_TABLE_NAME) {
//     return;
//   }
//   await migrateGroupsToV2AndSaveSnapshots({
//     entityManagerV2: createGroupsV2EntityManager({
//       documentClient: new DocumentClientV3(new DynamoDBClient({})),
//       globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
//       prefix: "script-",
//     }),
//     entityManager: createGroupsEntityManager({
//       documentClient: new DocumentClientV3(new DynamoDBClient({})),
//       globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
//       prefix: "script-",
//     }),

//     entityManagerSnapshot: createGroupSnapshotsEntityManager({
//       documentClient: new DocumentClientV3(new DynamoDBClient({})),
//       globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
//       prefix: "script-",
//     }),
//     dataFileStore: new S3FileStore("group-store", {
//       bucketName: process.env.SH_S3_DATA_BUCKET_NAME,
//       endpoint: process.env.SH_S3_DATA_ENDPOINT,
//     }),
//     dataFileStoreSnapshot: new S3FileStore("group-snapshot-store", {
//       bucketName: process.env.SH_S3_DATA_BUCKET_NAME,
//       endpoint: process.env.SH_S3_DATA_ENDPOINT,
//     }),
//     loggerService: new StdoutLogger(),
//   });
// };

// main();
