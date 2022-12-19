import { QUERY_ORDER } from "@typedorm/common";
import { EntityManager } from "@typedorm/core";
import { FileStore } from "file-store";
import {
  GroupModel,
  GroupModelLatest,
} from "infrastructure/group-store/groups.entity";
import {
  Group,
  GroupStore,
  groupMetadata,
  GroupSearch,
  ResolvedGroupWithData,
} from "topics/group";

export class DyanmoDBGroupStore extends GroupStore {
  entityManager: EntityManager;
  dataFileStore: FileStore;

  constructor(dataFileStore: FileStore, entityManager: EntityManager) {
    super();
    this.entityManager = entityManager;
    this.dataFileStore = dataFileStore;
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
        resolvedIdentifierData: () =>
          this.dataFileStore.read(this.resolvedFilename(groupMetadata)),
      };
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
      ? await this.entityManager.find(GroupModelLatest, {
          name: groupName,
        })
      : await this.entityManager.find(
          GroupModel,
          {
            name: groupName,
          },
          {
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

    const groups = groupsItem.items.map((group) => {
      const groupMetadata = group.toGroupMetadata();
      return {
        ...groupMetadata,
        data: () => this.dataFileStore.read(this.filename(groupMetadata)),
        resolvedIdentifierData: async () => {
          if (
            await this.dataFileStore.exists(
              this.resolvedFilename(groupMetadata)
            )
          ) {
            return this.dataFileStore.read(
              this.resolvedFilename(groupMetadata)
            );
          }
          return this.dataFileStore.read(this.filename(groupMetadata));
        },
      };
    });
    return groups;
  }

  public async save(group: ResolvedGroupWithData): Promise<void> {
    const groupMain = GroupModel.fromGroupMetadata(groupMetadata(group));
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.dataFileStore.write(
      this.resolvedFilename(group),
      group.resolvedIdentifierData
    );
    await this.entityManager.create(groupMain);
    const groupLatest = GroupModelLatest.fromGroupMetadata(
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
}
