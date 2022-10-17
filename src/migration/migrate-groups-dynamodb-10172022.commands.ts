import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { EntityManager } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { Command } from "commander";
import { createAvailableDataEntityManager } from "infrastructure/available-data";
import { GroupModel, GroupModelLatest } from "infrastructure/group-store";
import { AccountSource } from "topics/group";

export const migrateGroups = async (entityManager?: EntityManager) => {
  /* istanbul ignore if */
  if (!entityManager) {
    entityManager = createAvailableDataEntityManager({
      documentClient: new DocumentClientV3(new DynamoDBClient({})),
      globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
    });
  }

  const latestsGroupsItems = await entityManager.find(
    GroupModelLatest,
    {},
    {
      queryIndex: "GSI1",
    }
  );
  for (const group of latestsGroupsItems.items) {
    group.accountSources = [AccountSource.ETHEREUM];
    await entityManager.create(group, {
      overwriteIfExists: true,
    });
    const allGroups = await entityManager.find(GroupModel, {
      name: group.name,
    });
    for (const groupGenerated of allGroups.items) {
      groupGenerated.accountSources = [AccountSource.ETHEREUM];
      await entityManager.create(groupGenerated, {
        overwriteIfExists: true,
      });
    }
  }
};

export const migrateGroupsCmd = new Command("migrate-groups");
migrateGroupsCmd.action(migrateGroups);
