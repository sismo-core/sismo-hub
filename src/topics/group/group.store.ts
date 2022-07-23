import { Group } from "./group";
import { FetchedData, GroupSearch } from "./group.types";

export default abstract class GroupStore {
  public abstract all(): Promise<Group[]>;
  public abstract dataUrl(group: Group): string;
  public abstract getData(group: Group): Promise<FetchedData>;
  public abstract save(group: Group): Promise<void>;

  public async latest(groupName: string) {
    const latest = await this.search({ groupName: groupName, latest: true });
    if (latest.length != 1) {
      throw Error(`"${groupName}" group not yet generated!`);
    }
    return latest[0];
  }

  public async latests(): Promise<{ [name: string]: Group }> {
    const latests: { [name: string]: Group } = {};
    for (const group of await this.all()) {
      if (
        !latests[group.name] ||
        group.timestamp > latests[group.name].timestamp
      ) {
        latests[group.name] = group;
      }
    }
    return latests;
  }

  public async search({ groupName, latest }: GroupSearch): Promise<Group[]> {
    let groups = await this.all();
    groups = groups.filter((group) => group.name == groupName);
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
