import { Group } from "./group"
import { GroupSearch } from "./group.types";

export default abstract class GroupStore {
  public abstract save(group: Group): Promise<void>;
  public abstract all(name: string): Promise<Group[]>;

  protected latest(groups: Group[]) {
    if (groups.length == 0) {
      return []
    }
    let latest = groups[0];
    for (const group of groups) {
      if (group.generationDate > latest.generationDate) {
        latest = group;
      }
    }
    return [latest]
  }

  public async search({groupName, latest}: GroupSearch): Promise<Group[]> {
    const groups = await this.all(groupName)
    return latest ? this.latest(groups) : groups
  }
}
