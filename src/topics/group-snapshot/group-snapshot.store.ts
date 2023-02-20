import { createHash } from "crypto";
import { FileStore } from "file-store";
import {
  GroupSnapshot,
  GroupSnapshotMetadata,
  GroupSnapshotSearch,
  ResolvedGroupSnapshotWithData,
} from "topics/group-snapshot/group-snapshot.types";

export abstract class GroupSnapshotStore {
  public abstract all(): Promise<GroupSnapshot[]>;
  public abstract save(
    groupSnapshot: ResolvedGroupSnapshotWithData
  ): Promise<GroupSnapshot>;
  public abstract delete(groupSnapshot: GroupSnapshot): Promise<void>;
  public abstract reset(): Promise<void>;

  public abstract dataFileStore: FileStore;

  protected filename(groupSnapshot: GroupSnapshotMetadata) {
    return `${groupSnapshot.groupId}/${groupSnapshot.timestamp}.json`;
  }

  protected resolvedFilename(groupSnapshot: GroupSnapshotMetadata) {
    return `${groupSnapshot.groupId}/${groupSnapshot.timestamp}.resolved.json`;
  }

  dataUrl(groupSnapshot: GroupSnapshotMetadata): string {
    return this.dataFileStore.url(this.filename(groupSnapshot));
  }

  public async latestById(groupId: string) {
    const latest = await this.search({
      groupId: groupId,
      timestamp: "latest",
    });
    return latest[0];
  }

  public async latestByName(groupSnapshotName: string) {
    const latest = await this.search({
      groupSnapshotName: groupSnapshotName,
      timestamp: "latest",
    });
    return latest[0];
  }

  public async allByGroupId(groupId: string): Promise<GroupSnapshot[]> {
    // retrieve all the group snapshots for a specific id
    const latests: GroupSnapshot[] = [];
    for (const groupSnapshot of await this.all()) {
      if (groupSnapshot.groupId === groupId) {
        latests.push(groupSnapshot);
      }
    }
    return latests;
  }

  public async allByName(groupSnapshotName: string): Promise<GroupSnapshot[]> {
    // retrieve all the group snapshots for a specific name
    const latests: GroupSnapshot[] = [];
    for (const groupSnapshot of await this.all()) {
      if (groupSnapshot.name === groupSnapshotName) {
        latests.push(groupSnapshot);
      }
    }
    return latests;
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
    let groupSnapshots = await this.all();
    if (groupId) {
      groupSnapshots = groupSnapshots.filter(
        (groupSnapshot) => groupSnapshot.groupId == groupId
      );
    }

    if (groupSnapshotName) {
      groupSnapshots = groupSnapshots.filter(
        (groupSnapshot) => groupSnapshot.name == groupSnapshotName
      );
    }

    groupSnapshots = groupSnapshots.sort(
      (firstGroupSnapshot, secondGroupSnapshot) =>
        secondGroupSnapshot.timestamp - firstGroupSnapshot.timestamp
    );

    if (timestamp === "latest") {
      groupSnapshots = groupSnapshots.slice(0, 1);
      return groupSnapshots;
    }

    if (timestamp && timestamp !== "latest") {
      groupSnapshots = groupSnapshots.filter(
        (groupSnapshot: GroupSnapshot) => groupSnapshot.timestamp === timestamp
      );
    }

    return groupSnapshots;
  }

  protected async _handleMD5Checksum(
    groupSnapshot: ResolvedGroupSnapshotWithData
  ): Promise<ResolvedGroupSnapshotWithData> {
    const integrityFormat = async (filename: string) => {
      return (
        "md5-" +
        createHash("md5")
          .update(
            JSON.stringify(await this.dataFileStore.read(filename)).toString()
          )
          .digest("hex")
      );
    };

    return {
      ...groupSnapshot,
      dataIntegrity: await integrityFormat(this.filename(groupSnapshot)),
      resolvedIdentifierDataIntegrity: await integrityFormat(
        this.resolvedFilename(groupSnapshot)
      ),
    };
  }
}
