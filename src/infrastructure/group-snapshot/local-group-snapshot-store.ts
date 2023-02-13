import { LocalFileStore } from "infrastructure/file-store";
import { groupSnapshotMetadata } from "topics/group-snapshot/group-snapshot";
import { GroupSnapshotStore } from "topics/group-snapshot/group-snapshot.store";
import {
  GroupSnapshot,
  GroupSnapshotMetadata,
  ResolvedGroupSnapshotWithData,
} from "topics/group-snapshot/group-snapshot.types";

export class LocalGroupSnapshotStore extends GroupSnapshotStore {
  localFileStore: LocalFileStore;
  dataFileStore: LocalFileStore;

  constructor(diskPath?: string) {
    super();
    this.localFileStore = new LocalFileStore("group-snapshots", diskPath);
    this.dataFileStore = new LocalFileStore("group-snapshots-data", diskPath);
  }

  async all(): Promise<GroupSnapshot[]> {
    const groupSnapshots: GroupSnapshot[] = [];
    for (const groupSnapshotId of await this.localFileStore.list("./")) {
      for (const filename of await this.localFileStore.list(groupSnapshotId)) {
        groupSnapshots.push(await this.load(`${groupSnapshotId}/${filename}`));
      }
    }
    return groupSnapshots;
  }

  async load(filename: string): Promise<GroupSnapshot> {
    const groupSnapshot: GroupSnapshotMetadata = await this.localFileStore.read(
      filename
    );
    return {
      ...groupSnapshot,
      data: () => this.dataFileStore.read(this.filename(groupSnapshot)),
      resolvedIdentifierData: () =>
        this.dataFileStore.read(this.resolvedFilename(groupSnapshot)),
    };
  }

  async save(groupSnapshot: ResolvedGroupSnapshotWithData): Promise<void> {
    await this.localFileStore.write(
      this.filename(groupSnapshot),
      groupSnapshotMetadata(groupSnapshot)
    );
    await this.dataFileStore.write(
      this.filename(groupSnapshot),
      groupSnapshot.data
    );
    await this.dataFileStore.write(
      this.resolvedFilename(groupSnapshot),
      groupSnapshot.resolvedIdentifierData
    );
  }

  async reset(): Promise<void> {
    this.localFileStore.reset();
  }
}
