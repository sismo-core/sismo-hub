import { QUERY_ORDER } from "@typedorm/common";
import { EntityManager } from "@typedorm/core";
import { FileStore } from "file-store";
import { GroupSnapshotModel } from "infrastructure/group-snapshot/group-snapshot.entity";
import { groupSnapshotMetadata } from "topics/group-snapshot/group-snapshot";
import { GroupSnapshotStore } from "topics/group-snapshot/group-snapshot.store";
import {
  GroupSnapshot,
  GroupSnapshotSearch,
  ResolvedGroupSnapshotWithData,
} from "topics/group-snapshot/group-snapshot.types";

export class DynamoDBGroupSnapshotStore extends GroupSnapshotStore {
  entityManager: EntityManager;
  dataFileStore: FileStore;

  constructor(dataFileStore: FileStore, entityManager: EntityManager) {
    super();
    this.entityManager = entityManager;
    this.dataFileStore = dataFileStore;
  }

  public async allByGroupId(groupId: string): Promise<GroupSnapshot[]> {
    const groupSnapshotsItems = await this.entityManager.find(
      GroupSnapshotModel,
      {
        groupId: groupId,
      },
      {
        orderBy: QUERY_ORDER.DESC,
      }
    );

    const groupSnapshots = groupSnapshotsItems.items.map((groupSnapshotModel) =>
      this._fromGroupSnapshotModelToGroupSnapshot(groupSnapshotModel)
    );
    return groupSnapshots;
  }

  public async allByName(groupSnapshotName: string): Promise<GroupSnapshot[]> {
    const groupSnapshotsItems = await this.entityManager.find(
      GroupSnapshotModel,
      {
        name: groupSnapshotName,
      },
      {
        queryIndex: "GSI1",
        orderBy: QUERY_ORDER.DESC,
      }
    );

    const groupSnapshots = groupSnapshotsItems.items.map((groupSnapshotModel) =>
      this._fromGroupSnapshotModelToGroupSnapshot(groupSnapshotModel)
    );
    return groupSnapshots;
  }

  public async search({
    groupId,
    groupSnapshotName,
    timestamp,
  }: GroupSnapshotSearch): Promise<GroupSnapshot[]> {
    if (groupId && groupSnapshotName) {
      throw new Error(
        "You should not reference a groupId and groupSnapshotName at the same time"
      );
    }

    let groupSnapshotsItems: GroupSnapshotModel[] = [];
    if (groupId) {
      groupSnapshotsItems =
        timestamp === "latest"
          ? ((
              await this.entityManager.find(
                GroupSnapshotModel,
                {
                  groupId,
                },
                {
                  orderBy: QUERY_ORDER.DESC,
                  limit: 1,
                }
              )
            ).items as GroupSnapshotModel[])
          : ((
              await this.entityManager.find(
                GroupSnapshotModel,
                {
                  groupId,
                },
                {
                  orderBy: QUERY_ORDER.DESC,
                  keyCondition: {
                    EQ: `TS#${timestamp}`,
                  },
                }
              )
            ).items as GroupSnapshotModel[]);
    }

    if (groupSnapshotName) {
      groupSnapshotsItems =
        timestamp === "latest"
          ? ((
              await this.entityManager.find(
                GroupSnapshotModel,
                {
                  name: groupSnapshotName,
                },
                { queryIndex: "GSI1", orderBy: QUERY_ORDER.DESC, limit: 1 }
              )
            ).items as GroupSnapshotModel[])
          : ((
              await this.entityManager.find(
                GroupSnapshotModel,
                {
                  name: groupSnapshotName,
                },
                {
                  queryIndex: "GSI1",
                  orderBy: QUERY_ORDER.DESC,
                  keyCondition: {
                    EQ: `TS#${timestamp}`,
                  },
                }
              )
            ).items as GroupSnapshotModel[]);
    }

    const groupSnapshots = groupSnapshotsItems.map((groupSnapshotModel) =>
      this._fromGroupSnapshotModelToGroupSnapshot(groupSnapshotModel)
    );
    return groupSnapshots;
  }

  public async save(
    groupSnapshot: ResolvedGroupSnapshotWithData
  ): Promise<GroupSnapshot> {
    await this.dataFileStore.write(
      this.filename(groupSnapshot),
      groupSnapshot.data
    );
    await this.dataFileStore.write(
      this.resolvedFilename(groupSnapshot),
      groupSnapshot.resolvedIdentifierData
    );

    const updatedGroupSnapshotWithMD5 = await this._handleMD5Checksum(
      groupSnapshot
    );

    const groupSnapshotMain = GroupSnapshotModel.fromGroupSnapshotMetadata(
      groupSnapshotMetadata(updatedGroupSnapshotWithMD5)
    );

    const savedSnapshot: GroupSnapshotModel = await this.entityManager.create(
      groupSnapshotMain
    );
    return this._fromGroupSnapshotModelToGroupSnapshot(savedSnapshot);
  }

  public async delete(groupSnapshot: GroupSnapshot): Promise<void> {
    await this.dataFileStore.delete(this.filename(groupSnapshot));
    await this.dataFileStore.delete(this.resolvedFilename(groupSnapshot));

    await this.entityManager.delete(GroupSnapshotModel, {
      groupId: groupSnapshot.groupId,
      timestamp: groupSnapshot.timestamp,
    });
  }

  /* istanbul ignore next */
  public async reset(): Promise<void> {
    throw new Error("Not implemented in dynamodb store");
  }

  /* istanbul ignore next */
  public async all(): Promise<GroupSnapshot[]> {
    throw new Error("Not implemented in dynamodb store");
  }

  private _fromGroupSnapshotModelToGroupSnapshot(
    groupSnapshotModel: GroupSnapshotModel
  ): GroupSnapshot {
    const groupSnapshotMetadata = groupSnapshotModel.toGroupSnapshotMetadata();
    return {
      ...groupSnapshotMetadata,
      data: () => this.dataFileStore.read(this.filename(groupSnapshotMetadata)),
      resolvedIdentifierData: async () => {
        if (
          await this.dataFileStore.exists(
            this.resolvedFilename(groupSnapshotMetadata)
          )
        ) {
          return this.dataFileStore.read(
            this.resolvedFilename(groupSnapshotMetadata)
          );
        }
        return this.dataFileStore.read(this.filename(groupSnapshotMetadata));
      },
    };
  }
}
