import { v4 as uuid } from "uuid";
import { MemoryFileStore } from "infrastructure/file-store";
import {
  Group,
  GroupMetadata,
  GroupStore,
  groupMetadata,
  ResolvedGroupWithData,
} from "topics/group";

export class MemoryGroupStore extends GroupStore {
  _groupsStore: (GroupMetadata & { id: string })[];
  dataFileStore: MemoryFileStore;

  constructor() {
    super();
    this.reset().then();
  }

  async all(): Promise<Group[]> {
    return Object.values(this._groupsStore).map((metadata) => ({
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

  async save(group: ResolvedGroupWithData): Promise<Group> {
    const id = uuid();
    const groupMetadataAndId = { ...groupMetadata(group), id };
    this._groupsStore.push(groupMetadataAndId);
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.dataFileStore.write(
      this.resolvedFilename(group),
      group.resolvedIdentifierData
    );

    return {
      ...groupMetadataAndId,
      data: () => this.dataFileStore.read(this.filename(group)),
      resolvedIdentifierData: () =>
        this.dataFileStore.read(this.resolvedFilename(group)),
    };
  }

  async update(group: ResolvedGroupWithData & { id: string }): Promise<Group> {
    const groupIndex = this._groupsStore.findIndex((g) => g.id === group.id);
    this._groupsStore[groupIndex] = group;
    return {
      ...group,
      data: () => this.dataFileStore.read(this.filename(group)),
      resolvedIdentifierData: () =>
        this.dataFileStore.read(this.resolvedFilename(group)),
    };
  }
}
