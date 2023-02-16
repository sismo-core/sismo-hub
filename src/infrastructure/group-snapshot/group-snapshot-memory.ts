import { MemoryFileStore } from "infrastructure/file-store";
import { groupSnapshotMetadata } from "topics/group-snapshot/group-snapshot";
import { GroupSnapshotStore } from "topics/group-snapshot/group-snapshot.store";
import {
  GroupSnapshot,
  GroupSnapshotMetadata,
  ResolvedGroupSnapshotWithData,
} from "topics/group-snapshot/group-snapshot.types";

export class MemoryGroupSnapshotStore extends GroupSnapshotStore {
  _groupSnapshotsStore: GroupSnapshotMetadata[];
  dataFileStore: MemoryFileStore;

  constructor() {
    super();
    this.reset().then();
  }

  async all(): Promise<GroupSnapshot[]> {
    return this._groupSnapshotsStore.map((metadata) => ({
      ...metadata,
      data: () => this.dataFileStore.read(this.filename(metadata)),
      resolvedIdentifierData: () =>
        this.dataFileStore.read(this.resolvedFilename(metadata)),
    }));
  }

  async reset(): Promise<void> {
    this._groupSnapshotsStore = [];
    this.dataFileStore = new MemoryFileStore("group-snapshots-data");
  }

  async save(groupSnapshot: ResolvedGroupSnapshotWithData): Promise<void> {
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

    this._groupSnapshotsStore.push(
      groupSnapshotMetadata(updatedGroupSnapshotWithMD5)
    );
  }
}
