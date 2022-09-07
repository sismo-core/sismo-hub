import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  createConnection,
  EntityManager,
  getEntityManager,
} from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { FileStore } from "file-store";
import { globalTable } from "infrastructure/group-store/dynamo-global-table";
import {
  GroupModel,
  GroupModelLatest,
} from "infrastructure/group-store/groups-model";
import {
  Group,
  GroupStore,
  GroupWithData,
  groupMetadata,
  GroupSearch,
  FetchedData,
} from "topics/group";

const documentClient = new DocumentClientV3(
  new DynamoDBClient({
    endpoint: "http://localhost:9000",
    region: "eu-west-1",
  })
);

export class DyanmoDBGroupStore extends GroupStore {
  entityManager: EntityManager;
  dataFileStore: FileStore;

  constructor() {
    super();
    createConnection({
      table: globalTable,
      entities: [GroupModel, GroupModelLatest],
      documentClient, // <-- When documentClient is not provided, TypeDORM defaults to use the DocumentClientV2
    });
    this.entityManager = getEntityManager();
  }

  public async latests(): Promise<{ [name: string]: Group }> {
    const latestsGroups = await this.entityManager.find(
      GroupModelLatest,
      {},
      {
        queryIndex: "GSI1",
      }
    );
    const latests: { [name: string]: Group } = {};
    for (const group of latestsGroups.items) {
      latests[group.name] = {
        ...group.toGroupMetadata(),
        data: async (): Promise<FetchedData> => ({}),
      };
    }
    return latests;
  }

  public async search({ groupName, latest }: GroupSearch): Promise<Group[]> {
    const groupsItem = latest
      ? await this.entityManager.find(GroupModelLatest, {
          name: groupName,
        })
      : await this.entityManager.find(GroupModel, {
          name: groupName,
        });

    const groups = groupsItem.items.map((group) => ({
      ...group.toGroupMetadata(),
      data: async (): Promise<FetchedData> => ({}),
    }));
    return groups;
  }

  public async all(): Promise<Group[]> {
    throw new Error("Not implemented in dynamodb store");
  }

  public async save(group: GroupWithData): Promise<void> {
    const groupMain = GroupModel.fromGroupMetadata(groupMetadata(group));
    await this.entityManager.create(groupMain);
    const groupLatest = GroupModelLatest.fromGroupMetadata(
      groupMetadata(group)
    );
    await this.entityManager.create(groupLatest, {
      overwriteIfExists: true,
    });
  }
  public async reset(): Promise<void> {
    const all = await documentClient.scan({
      TableName: globalTable.name,
    });
    if (!all.Items) {
      return;
    }
    for (const item of all.Items) {
      await documentClient.delete({
        TableName: globalTable.name,
        Key: {
          PK: item.PK,
          SK: item.SK,
        },
      });
    }
  }
}
