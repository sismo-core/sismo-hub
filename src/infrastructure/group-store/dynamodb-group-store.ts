import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  createConnection,
  EntityManager,
  getEntityManager,
} from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { FileStore } from "file-store";
import { globalTable } from "infrastructure/dynamodb-global/dynamo-global-table";
import { S3FileStore } from "infrastructure/file-store/s3-file-store";
import { defaultLocalS3Options } from "infrastructure/file-store/s3-file-store-local-options";
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
      documentClient,
    });
    this.entityManager = getEntityManager();
    this.dataFileStore = new S3FileStore("groups-data", defaultLocalS3Options);
  }

  public async latests(): Promise<{ [name: string]: Group }> {
    const latestsGroupsItems = await this.entityManager.find(
      GroupModelLatest,
      {},
      {
        queryIndex: "GSI1",
      }
    );
    const latests: { [name: string]: Group } = {};
    for (const group of latestsGroupsItems.items) {
      const groupMetadata = group.toGroupMetadata();
      latests[group.name] = {
        ...groupMetadata,
        data: () => this.dataFileStore.read(this.filename(groupMetadata)),
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

    const groups = groupsItem.items.map((group) => {
      const groupMetadata = group.toGroupMetadata();
      return {
        ...groupMetadata,
        data: () => this.dataFileStore.read(this.filename(groupMetadata)),
      };
    });
    return groups;
  }

  public async save(group: GroupWithData): Promise<void> {
    const groupMain = GroupModel.fromGroupMetadata(groupMetadata(group));
    await this.dataFileStore.write(this.filename(group), group.data);
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
    /* istanbul ignore if */
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

  /* istanbul ignore next */
  public async all(): Promise<Group[]> {
    throw new Error("Not implemented in dynamodb store");
  }
}
