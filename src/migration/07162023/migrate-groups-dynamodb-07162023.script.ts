import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DocumentClientV3 } from "@typedorm/document-client";
import { createGroupSnapshotsEntityManager } from "infrastructure/group-snapshot/group-snapshot.entity";
import { createGroupsV2EntityManager } from "infrastructure/group-store/groups-v2.entity";
import { saveGroupSnapshotLatest } from "migration/07162023/migrate-groups-dynamodb-07162023";

const main = async () => {
  if (!process.env.SH_DYNAMO_GLOBAL_TABLE_NAME) {
    console.log("SH_DYNAMO_GLOBAL_TABLE_NAME is not set");
    return;
  }
  await saveGroupSnapshotLatest({
    entityManagerV2: createGroupsV2EntityManager({
      documentClient: new DocumentClientV3(
        new DynamoDBClient({
          // endpoint: "http://localhost:9000",
          // region: "eu-west-1",
        })
      ),
      globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
      prefix: "script-",
    }),
    entityManagerSnapshot: createGroupSnapshotsEntityManager({
      documentClient: new DocumentClientV3(
        new DynamoDBClient({
          // endpoint: "http://localhost:9000",
          // region: "eu-west-1",
        })
      ),
      globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
      prefix: "script-",
    }),
  });
};

main();
