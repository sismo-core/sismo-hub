import { Group } from "./group";
import { GroupSearch } from "./group.types";

export default abstract class GroupStore {
  public abstract save(group: Group): Promise<void>;
  public abstract all(): Promise<Group[]>;

  public async latest(groupName: string) {
    const latest = await this.search({ groupName: groupName, latest: true });
    if (latest.length != 1) {
      throw Error(`"${groupName}" group not yet generated!`);
    }
    return latest[0];
  }

  public async search({ groupName, latest }: GroupSearch): Promise<Group[]> {
    let groups = await this.all();
    groups = groupName
      ? groups.filter((group) => group.name == groupName)
      : groups;
    return latest ? this._latest(groups) : groups;
  }

  protected _latest(groups: Group[]) {
    if (groups.length == 0) {
      return [];
    }
    let latest = groups[0];
    for (const group of groups) {
      if (group.timestamp > latest.timestamp) {
        latest = group;
      }
    }
    return [latest];
  }
}
