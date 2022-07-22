import { FetchedData, Group, GroupType } from "../../topics/group";
import GroupStore from "../../topics/group/group.store";
import { MemoryFileStore } from "../file-store";

export class MemoryGroupStore extends GroupStore {
  _groupsStore: GroupType[] = [];
  _dataStore: MemoryFileStore;

  constructor() {
    super();
    this._dataStore = new MemoryFileStore();
  }

  async all(): Promise<Group[]> {
    return this._groupsStore.map((group) => new Group(group));
  }

  async getData(group: Group): Promise<FetchedData> {
    return this._dataStore.read(group.filename());
  }

  async save(group: Group): Promise<void> {
    this._groupsStore.push(group.toJson());
    await this._dataStore.write(group.filename(), await group.data());
  }
}
