import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DocumentClientV3 } from "@typedorm/document-client";
import { S3FileStore } from "infrastructure/file-store";
import { DynamoDBGroupStore } from "infrastructure/group-store";
import { createGroupsV2EntityManager } from "infrastructure/group-store/groups-v2.entity";
import { StdoutLogger } from "infrastructure/logger/stdout-logger";
import { storeEligibilityDescriptionsInGroupsInsteadOfBadges } from "migration/02192023/migrate-badge-specs-to-groups-02192023";

const main = async () => {
  if (!process.env.SH_DYNAMO_GLOBAL_TABLE_NAME) {
    return;
  }
  await storeEligibilityDescriptionsInGroupsInsteadOfBadges({
    groupStore: new DynamoDBGroupStore(
      new S3FileStore("group-store", {
        bucketName: process.env.SH_S3_DATA_BUCKET_NAME, // "local/minio",
        endpoint: process.env.SH_S3_DATA_ENDPOINT, //"http://127.0.0.1:9002/local",
        // s3Options: {
        //   endpoint: process.env.SH_S3_DATA_ENDPOINT ?? "http://127.0.0.1:9002",
        //   s3ForcePathStyle: true,
        // },
      }),
      createGroupsV2EntityManager({
        documentClient: new DocumentClientV3(
          new DynamoDBClient({
            // endpoint: "http://localhost:9000",
            // region: "eu-west-1",
          })
        ),
        globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
        prefix: "script-",
      })
    ),
    loggerService: new StdoutLogger(),
  });
};

main();
