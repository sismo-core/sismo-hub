import { Group } from "../../topics/group";
import GroupStore from "../../topics/group/group.store";

export default class MemoryGroupStore extends GroupStore {
  _store: Group[] = [];

  async all(): Promise<Group[]> {
    return this._store;
  }

  async save(group: Group): Promise<void> {
    this._store.push(group);
  }
}
