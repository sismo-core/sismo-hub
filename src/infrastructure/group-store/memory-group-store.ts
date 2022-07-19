import { Group, GroupType } from "../../topics/group";
import GroupStore from "../../topics/group/group.store";

export class MemoryGroupStore extends GroupStore {
  _store: GroupType[] = [];

  async all(): Promise<Group[]> {
    return this._store.map((group) => new Group(group));
  }

  async save(group: Group): Promise<void> {
    this._store.push(group.toJson());
  }
}
