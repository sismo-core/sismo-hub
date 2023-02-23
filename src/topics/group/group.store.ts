import { BigNumber } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { Group, GroupSearch, GroupMetadata, ResolvedGroupWithData } from ".";
import { FileStore } from "file-store";

export abstract class GroupStore {
  public abstract all(): Promise<{ [name: string]: Group }>;
  public abstract save(group: ResolvedGroupWithData): Promise<Group>;
  public abstract delete(group: Group): Promise<void>;
  public abstract update(
    group: ResolvedGroupWithData & { id: string }
  ): Promise<Group>;
  public abstract updateMetadata(
    group: GroupMetadata & { id: string }
  ): Promise<Group>;

  public abstract reset(): Promise<void>;

  public abstract dataFileStore: FileStore;

  protected filename(group: GroupMetadata) {
    return `${group.name}/${group.timestamp}.json`;
  }

  protected resolvedFilename(group: GroupMetadata) {
    return `${group.name}/${group.timestamp}.resolved.json`;
  }

  dataUrl(group: GroupMetadata): string {
    return this.dataFileStore.url(this.filename(group));
  }

  // TODO: remove with future logics around snapshots
  public async latest(groupName: string): Promise<Group> {
    const latest = await this.search({ groupName: groupName, latest: true });
    if (latest.length != 1) {
      throw Error(`"${groupName}" group not yet generated!`);
    }
    return latest[0];
  }

  public async search({
    groupName,
    latest,
    timestamp,
  }: GroupSearch): Promise<Group[]> {
    if (timestamp && latest) {
      throw new Error(
        "You should not reference timestamp and latest at the same time"
      );
    }
    const allGroups = await this.all();

    let groups = Object.values(allGroups);
    groups = groups.filter((group) => group.name == groupName);
    if (timestamp) {
      groups = groups.filter((group: Group) => group.timestamp === timestamp);
      return groups;
    }
    if (groups.length === 0) {
      return [];
    }
    return latest ? [groups[0]] : groups;
  }

  public async getNewId(name: string): Promise<string> {
    const UINT128_MAX = BigNumber.from(2).pow(128).sub(1);
    const nameHash = BigNumber.from(keccak256(toUtf8Bytes(name)));
    let newId = nameHash.mod(UINT128_MAX).toHexString();

    const groups = await this.all();
    const groupWithSameId = Object.values(groups).find(
      (group) => group.id === newId
    );
    if (groupWithSameId) {
      newId = BigNumber.from(newId).add(1).toHexString();
    }

    return newId;
  }
}
