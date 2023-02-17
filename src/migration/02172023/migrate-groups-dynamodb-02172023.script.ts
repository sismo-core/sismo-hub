import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DocumentClientV3 } from "@typedorm/document-client";
import { createGroupSnapshotsEntityManager } from "infrastructure/group-snapshot/group-snapshot.entity";
import { createGroupsV2EntityManager } from "infrastructure/group-store/groups-v2.entity";
import { StdoutLogger } from "infrastructure/logger/stdout-logger";
import { changeGroupIdFromUUIDtoUint128 } from "migration/02172023/migrate-groups-dynamodb-02172023";

const main = async () => {
  if (!process.env.SH_DYNAMO_GLOBAL_TABLE_NAME) {
    return;
  }
  await changeGroupIdFromUUIDtoUint128({
    entityManagerV2: createGroupsV2EntityManager({
      documentClient: new DocumentClientV3(new DynamoDBClient({})),
      globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
      prefix: "script-",
    }),
    entityManagerSnapshot: createGroupSnapshotsEntityManager({
      documentClient: new DocumentClientV3(new DynamoDBClient({})),
      globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
      prefix: "script-",
    }),
    loggerService: new StdoutLogger(),
  });
};

main();
