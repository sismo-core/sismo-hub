import { QUERY_ORDER } from "@typedorm/common";
import { EntityManager } from "@typedorm/core";
import { FileStore } from "file-store";
import {
  GroupV2Model,
  GroupV2ModelLatest,
} from "infrastructure/group-store/groups-v2.entity";
import {
  Group,
  GroupStore,
  groupMetadata,
  GroupSearch,
  ResolvedGroupWithData,
} from "topics/group";

export class DynamoDBGroupStore extends GroupStore {
  entityManager: EntityManager;
  dataFileStore: FileStore;

  constructor(dataFileStore: FileStore, entityManager: EntityManager) {
    super();
    this.entityManager = entityManager;
    this.dataFileStore = dataFileStore;
  }

  public async latests(): Promise<{ [name: string]: Group }> {
    const latestsGroupsItems = await this.entityManager.find(
      GroupV2ModelLatest,
      {},
      {
        queryIndex: "GSI2",
      }
    );
    const latests: { [name: string]: Group } = {};
    for (const groupModel of latestsGroupsItems.items) {
      const group = this._fromGroupModelToGroup(groupModel);
      latests[group.name] = group;
    }
    return latests;
  }

  public async search({
    groupName,
    latest,
    timestamp,
  }: GroupSearch): Promise<Group[]> {
    if (timestamp && latest) {
      throw new Error(
        "You should not reference timestamp and latest at the same time"
      );
    }
    const groupsItem = latest
      ? await this.entityManager.find(
          GroupV2ModelLatest,
          {
            name: groupName,
          },
          { queryIndex: "GSI1" }
        )
      : await this.entityManager.find(
          GroupV2Model,
          {
            name: groupName,
          },
          {
            queryIndex: "GSI1",
            orderBy: QUERY_ORDER.DESC,
            ...(timestamp
              ? {
                  keyCondition: {
                    EQ: `TS#${timestamp}`,
                  },
                }
              : {}),
          }
        );

    const groups = groupsItem.items.map((group) =>
      this._fromGroupModelToGroup(group)
    );
    return groups;
  }

  public async save(group: ResolvedGroupWithData): Promise<void> {
    const groupMain = GroupV2Model.fromGroupMetadata(groupMetadata(group));
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.dataFileStore.write(
      this.resolvedFilename(group),
      group.resolvedIdentifierData
    );
    await this.entityManager.create(groupMain);
    const groupLatest = GroupV2ModelLatest.fromGroupMetadata(
      groupMetadata(group)
    );
    await this.entityManager.create(groupLatest, {
      overwriteIfExists: true,
    });
  }

  /* istanbul ignore next */
  public async reset(): Promise<void> {
    throw new Error("Not implemented in dynamodb store");
  }

  /* istanbul ignore next */
  public async all(): Promise<Group[]> {
    throw new Error("Not implemented in dynamodb store");
  }

  private _fromGroupModelToGroup(group: GroupV2Model) {
    const groupMetadata = group.toGroupMetadata();
    return {
      ...groupMetadata,
      data: () => this.dataFileStore.read(this.filename(groupMetadata)),
      resolvedIdentifierData: async () => {
        if (
          await this.dataFileStore.exists(this.resolvedFilename(groupMetadata))
        ) {
          return this.dataFileStore.read(this.resolvedFilename(groupMetadata));
        }
        return this.dataFileStore.read(this.filename(groupMetadata));
      },
    };
  }
}
