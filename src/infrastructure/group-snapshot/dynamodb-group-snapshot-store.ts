import { QUERY_ORDER } from "@typedorm/common";
import { EntityManager } from "@typedorm/core";
import { FileStore } from "file-store";
import {
  GroupSnapshotModel,
  GroupSnapshotModelLatest,
} from "infrastructure/group-snapshot/group-snapshot.entity";
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

  public async latests(): Promise<{ [id: string]: GroupSnapshot }> {
    const latestsGroupSnapshotsItems = await this.entityManager.find(
      GroupSnapshotModelLatest,
      {},
      {
        queryIndex: "GSI2",
      }
    );
    const latests: { [id: string]: GroupSnapshot } = {};
    for (const groupSnapshotModel of latestsGroupSnapshotsItems.items) {
      const groupSnapshot =
        this._fromGroupSnapshotModelToGroupSnapshot(groupSnapshotModel);
      latests[groupSnapshot.id] = groupSnapshot;
    }
    return latests;
  }

  public async allById(groupSnapshotId: string): Promise<GroupSnapshot[]> {
    const groupSnapshotsItems = await this.entityManager.find(
      GroupSnapshotModel,
      {
        id: groupSnapshotId,
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
    groupSnapshotId,
    groupSnapshotName,
    timestamp,
  }: GroupSnapshotSearch): Promise<GroupSnapshot[]> {
    if (!groupSnapshotId && !groupSnapshotName) {
      throw new Error(
        "You should not reference a groupSnapshotId and groupSnapshotName at the same time"
      );
    }

    const groupSnapshotsItems = groupSnapshotId
      ? timestamp === "latest"
        ? await this.entityManager.find(GroupSnapshotModelLatest, {
            id: groupSnapshotId,
          })
        : await this.entityManager.find(
            GroupSnapshotModel,
            {
              id: groupSnapshotId,
            },
            {
              orderBy: QUERY_ORDER.DESC,
              keyCondition: {
                EQ: `TS#${timestamp}`,
              },
            }
          )
      : timestamp === "latest"
      ? await this.entityManager.find(
          GroupSnapshotModelLatest,
          {
            name: groupSnapshotName,
          },
          { queryIndex: "GSI1" }
        )
      : await this.entityManager.find(
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
        );

    const groupSnapshots = groupSnapshotsItems.items.map((groupSnapshotModel) =>
      this._fromGroupSnapshotModelToGroupSnapshot(groupSnapshotModel)
    );
    return groupSnapshots;
  }

  public async save(
    groupSnapshot: ResolvedGroupSnapshotWithData
  ): Promise<void> {
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

    await this.entityManager.create(groupSnapshotMain);

    const groupSnapshotLatest =
      GroupSnapshotModelLatest.fromGroupSnapshotMetadata(
        groupSnapshotMetadata(updatedGroupSnapshotWithMD5)
      );
    await this.entityManager.create(groupSnapshotLatest, {
      overwriteIfExists: true,
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
