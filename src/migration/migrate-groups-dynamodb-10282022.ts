import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { EntityManager } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { FileStore } from "file-store";
import { LocalFileStore, S3FileStore } from "infrastructure/file-store";
import {
  createGroupsEntityManager,
  GroupModel,
  GroupModelLatest,
} from "infrastructure/group-store";
import { getLocalDocumentClient } from "infrastructure/utils";
import { FetchedData, GroupMetadata, Properties } from "topics/group";

export const migrateGroups = async (
  test: boolean,
  dataFileStore?: FileStore,
  entityManager?: EntityManager
) => {
  if (!entityManager) {
    if (!test) {
      entityManager = createGroupsEntityManager({
        documentClient: new DocumentClientV3(new DynamoDBClient({})),
        globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
        prefix: "script-",
      });
    }
    entityManager = createGroupsEntityManager({
      documentClient: getLocalDocumentClient(),
      globalTableName: process.env.SH_DYNAMO_GLOBAL_TABLE_NAME,
      prefix: "script-test-",
    });
  }

  if (!dataFileStore) {
    if (!test) {
      dataFileStore = new S3FileStore("group-store", {
        bucketName: process.env.SH_S3_DATA_BUCKET_NAME,
        endpoint: process.env.SH_S3_DATA_ENDPOINT,
      });
    }
    dataFileStore = new LocalFileStore(
      "groups-data-migration",
      `${__dirname}/../../../test-disk-store/unit`
    );
  }

  const latestsGroupsItems = await entityManager.find(
    GroupModelLatest,
    {},
    {
      queryIndex: "GSI1",
    }
  );
  for (const group of latestsGroupsItems.items) {
    const groupMetadata = group.toGroupMetadata();
    const filename = (group: GroupMetadata) =>
      `${group.name}/${group.timestamp}.json`;

    const data = await dataFileStore.read(filename(groupMetadata));
    group.properties = computeProperties(data);

    await entityManager.create(group, {
      overwriteIfExists: true,
    });

    const allGroups = await entityManager.find(GroupModel, {
      name: group.name,
    });
    for (const groupGenerated of allGroups.items) {
      const groupMetadata = groupGenerated.toGroupMetadata();
      const filename = (group: GroupMetadata) =>
        `${group.name}/${group.timestamp}.json`;

      const data = await dataFileStore.read(filename(groupMetadata));

      groupGenerated.properties = computeProperties(data);
      await entityManager.create(groupGenerated, {
        overwriteIfExists: true,
      });
    }
  }

  return entityManager;
};

const computeProperties = (data: FetchedData): Properties => {
  const tierDistribution: { [tier: number]: number } = {};
  let accountsNumber = 0;
  Object.values(data).map((tier: any) => {
    const tierString = tier.toString();
    tierDistribution[tierString]
      ? (tierDistribution[tierString] += 1)
      : (tierDistribution[tierString] = 1);
    accountsNumber++;
  });

  return {
    accountsNumber,
    tierDistribution,
  };
};

const main = async () => {
  await migrateGroups(false);
};

main();
