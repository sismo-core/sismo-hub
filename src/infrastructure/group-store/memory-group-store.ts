import { hexlify, randomBytes } from "ethers/lib/utils";
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

  async all(): Promise<{ [name: string]: Group }> {
    const allGroups: { [name: string]: Group } = {};
    for (const metadata of this._groupsStore) {
      allGroups[metadata.name] = {
        ...metadata,
        data: () => this.dataFileStore.read(this.filename(metadata)),
        resolvedIdentifierData: () =>
          this.dataFileStore.read(this.resolvedFilename(metadata)),
      };
    }
    return allGroups;
  }

  async reset(): Promise<void> {
    this._groupsStore = [];
    this.dataFileStore = new MemoryFileStore("groups-data");
  }

  async save(group: ResolvedGroupWithData): Promise<Group> {
    const id = hexlify(randomBytes(16));
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
    this._groupsStore[groupIndex] = { ...groupMetadata(group), id: group.id };
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.dataFileStore.write(
      this.resolvedFilename(group),
      group.resolvedIdentifierData
    );
    return {
      ...group,
      data: () => this.dataFileStore.read(this.filename(group)),
      resolvedIdentifierData: () =>
        this.dataFileStore.read(this.resolvedFilename(group)),
    };
  }
}
