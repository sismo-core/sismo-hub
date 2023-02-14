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
  ): Promise<void>;
  public abstract reset(): Promise<void>;

  public abstract dataFileStore: FileStore;

  protected filename(groupSnapshot: GroupSnapshotMetadata) {
    return `${groupSnapshot.id}/${groupSnapshot.timestamp}.json`;
  }

  protected resolvedFilename(groupSnapshot: GroupSnapshotMetadata) {
    return `${groupSnapshot.id}/${groupSnapshot.timestamp}.resolved.json`;
  }

  dataUrl(groupSnapshot: GroupSnapshotMetadata): string {
    return this.dataFileStore.url(this.filename(groupSnapshot));
  }

  public async latestById(groupSnapshotId: string) {
    const latest = await this.search({
      groupSnapshotId: groupSnapshotId,
      timestamp: "latest",
    });
    return this._checkLatest(latest);
  }

  public async latestByName(groupSnapshotName: string) {
    const latest = await this.search({
      groupSnapshotName: groupSnapshotName,
      timestamp: "latest",
    });
    return this._checkLatest(latest);
  }

  public async allById(groupSnapshotId: string): Promise<GroupSnapshot[]> {
    // retrieve all the group snapshots for a specific id
    const latests: GroupSnapshot[] = [];
    for (const groupSnapshot of await this.all()) {
      if (groupSnapshot.id === groupSnapshotId) {
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

  public async latests(): Promise<{ [id: string]: GroupSnapshot }> {
    const latests: { [id: string]: GroupSnapshot } = {};
    for (const groupSnapshot of await this.all()) {
      if (
        !latests[groupSnapshot.id] ||
        groupSnapshot.timestamp > latests[groupSnapshot.id].timestamp
      ) {
        latests[groupSnapshot.id] = groupSnapshot;
      }
    }
    return latests;
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
    let groupSnapshots = await this.all();
    if (groupSnapshotId) {
      groupSnapshots = groupSnapshots.filter(
        (groupSnapshot) => groupSnapshot.id == groupSnapshotId
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

    if (timestamp) {
      groupSnapshots = groupSnapshots.filter(
        (groupSnapshot: GroupSnapshot) => groupSnapshot.timestamp === timestamp
      );
    }

    return groupSnapshots;
  }

  private _checkLatest(latest: GroupSnapshot[]) {
    if (latest.length == 0) {
      throw Error(`"${latest}" group not yet generated!`);
    }
    return latest[0];
  }

  protected async _handleMD5Checksum(
    groupSnapshot: ResolvedGroupSnapshotWithData
  ): Promise<ResolvedGroupSnapshotWithData> {
    const dataMD5 = createHash("md5")
      .update(
        JSON.stringify(
          await this.dataFileStore.read(this.filename(groupSnapshot))
        ).toString()
      )
      .digest("hex");

    const resolvedIdentifierDataMD5 = createHash("md5")
      .update(
        JSON.stringify(
          await this.dataFileStore.read(this.resolvedFilename(groupSnapshot))
        ).toString()
      )
      .digest("hex");

    return {
      ...groupSnapshot,
      dataMD5,
      resolvedIdentifierDataMD5,
    };
  }
}
