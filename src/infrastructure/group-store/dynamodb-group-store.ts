import { QUERY_ORDER } from "@typedorm/common";
import { EntityManager } from "@typedorm/core";
import { FileStore } from "file-store";
import { GroupV2Model } from "infrastructure/group-store/groups-v2.entity";
import {
  Group,
  GroupStore,
  groupMetadata,
  GroupSearch,
  ResolvedGroupWithData,
  GroupMetadata,
} from "topics/group";

export class DynamoDBGroupStore extends GroupStore {
  entityManager: EntityManager;
  dataFileStore: FileStore;

  constructor(dataFileStore: FileStore, entityManager: EntityManager) {
    super();
    this.entityManager = entityManager;
    this.dataFileStore = dataFileStore;
  }

  public async all(): Promise<{ [name: string]: Group }> {
    const latestsGroupsItems = await this.entityManager.find(
      GroupV2Model,
      {},
      {
        queryIndex: "GSI2",
      }
    );

    const latests: { [name: string]: Group } = {};
    for (const groupModel of latestsGroupsItems.items) {
      const group = this._fromGroupModelToGroup(groupModel);
      if (
        !latests[group.name] ||
        latests[group.name].timestamp < group.timestamp
      ) {
        latests[group.name] = group;
      }
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
          GroupV2Model,
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
    const groups = groupsItem.items
      .map((group) => this._fromGroupModelToGroup(group))
      .sort((a, b) => b.timestamp - a.timestamp);

    return groups;
  }

  public async save(group: ResolvedGroupWithData): Promise<Group> {
    const id = await this.getNewId(group.name);
    const groupMetadataAndId = { ...groupMetadata(group), id };
    const groupMain = GroupV2Model.fromGroupMetadataAndId(groupMetadataAndId);
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.dataFileStore.write(
      this.resolvedFilename(group),
      group.resolvedIdentifierData
    );
    const savedGroup: GroupV2Model = await this.entityManager.create(
      groupMain,
      {
        overwriteIfExists: true,
      }
    );

    return this._fromGroupModelToGroup(savedGroup);
  }

  public async update(
    group: ResolvedGroupWithData & { id: string }
  ): Promise<Group> {
    const groupMetadataAndId = { ...groupMetadata(group), id: group.id };
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.dataFileStore.write(
      this.resolvedFilename(group),
      group.resolvedIdentifierData
    );
    const groupMain = GroupV2Model.fromGroupMetadataAndId(groupMetadataAndId);
    const updatedGroup: GroupV2Model = await this.entityManager.create(
      groupMain,
      {
        overwriteIfExists: true,
      }
    );
    return this._fromGroupModelToGroup(updatedGroup);
  }

  public async updateMetadata(
    group: GroupMetadata & { id: string }
  ): Promise<Group> {
    const groupMetadataAndId = { ...group, id: group.id };
    const groupMain = GroupV2Model.fromGroupMetadataAndId(groupMetadataAndId);
    const updatedGroup: GroupV2Model = await this.entityManager.create(
      groupMain,
      {
        overwriteIfExists: true,
      }
    );
    return this._fromGroupModelToGroup(updatedGroup);
  }

  public async delete(group: Group): Promise<void> {
    await this.dataFileStore.delete(this.filename(group));
    await this.dataFileStore.delete(this.resolvedFilename(group));
    await this.entityManager.delete(GroupV2Model, {
      id: group.id,
      timestamp: group.timestamp,
    });
  }

  /* istanbul ignore next */
  public async reset(): Promise<void> {
    throw new Error("Not implemented in dynamodb store");
  }

  private _fromGroupModelToGroup(group: GroupV2Model) {
    const groupMetadataWithId = group.toGroupMetadataWithId();
    return {
      ...groupMetadataWithId,
      data: () => this.dataFileStore.read(this.filename(groupMetadataWithId)),
      resolvedIdentifierData: async () => {
        if (
          await this.dataFileStore.exists(
            this.resolvedFilename(groupMetadataWithId)
          )
        ) {
          return this.dataFileStore.read(
            this.resolvedFilename(groupMetadataWithId)
          );
        }
        return this.dataFileStore.read(this.filename(groupMetadataWithId));
      },
    };
  }
}
