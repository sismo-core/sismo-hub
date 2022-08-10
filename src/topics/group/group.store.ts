import { Group, GroupSearch, GroupWithData, GroupMetadata } from ".";
import { FileStore } from "file-store";

export abstract class GroupStore {
  public abstract all(): Promise<Group[]>;
  public abstract save(group: GroupWithData): Promise<void>;
  public abstract reset(): Promise<void>;

  public abstract dataFileStore: FileStore;

  protected filename(group: GroupMetadata) {
    return `${group.name}/${group.timestamp}.json`;
  }

  dataUrl(group: GroupMetadata): string {
    return this.dataFileStore.url(this.filename(group));
  }

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
