import {
  Group,
  GroupMetadata,
  GroupStore,
  GroupWithData,
  groupMetadata,
} from "../../topics/group";
import { MemoryFileStore } from "../file-store";

export class MemoryGroupStore extends GroupStore {
  _groupsStore: GroupMetadata[];
  _dataStore: MemoryFileStore;

  constructor() {
    super();
    this.reset();
  }

  async all(): Promise<Group[]> {
    return this._groupsStore.map((metadata) => ({
      ...metadata,
      data: () => this._dataStore.read(this.getKey(metadata)),
    }));
  }

  async reset(): Promise<void> {
    this._groupsStore = [];
    this._dataStore = new MemoryFileStore("");
  }

  dataUrl(group: GroupMetadata): string {
    return this._dataStore.url(this.getKey(group));
  }

  async save(group: GroupWithData): Promise<void> {
    this._groupsStore.push(groupMetadata(group));
    await this._dataStore.write(this.getKey(group), await group.data);
  }

  protected getKey(group: GroupMetadata) {
    return `${group.name}-${group.timestamp}`;
  }
}
