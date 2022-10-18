import { MemoryFileStore } from "infrastructure/file-store";
import {
  Group,
  GroupMetadata,
  GroupStore,
  groupMetadata,
  ResolvedGroupWithData,
} from "topics/group";

export class MemoryGroupStore extends GroupStore {
  _groupsStore: GroupMetadata[];
  dataFileStore: MemoryFileStore;

  constructor() {
    super();
    this.reset().then();
  }

  async all(): Promise<Group[]> {
    return this._groupsStore.map((metadata) => ({
      ...metadata,
      data: () => this.dataFileStore.read(this.filename(metadata)),
      resolvedIdentifierData: () =>
        this.dataFileStore.read(this.resolvedFilename(metadata)),
    }));
  }

  async reset(): Promise<void> {
    this._groupsStore = [];
    this.dataFileStore = new MemoryFileStore("groups-data");
  }

  async save(group: ResolvedGroupWithData): Promise<void> {
    this._groupsStore.push(groupMetadata(group));
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.dataFileStore.write(
      this.resolvedFilename(group),
      group.resolvedIdentifierData
    );
  }
}
