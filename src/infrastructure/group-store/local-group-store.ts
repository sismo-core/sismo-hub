import { LocalFileStore } from "infrastructure/file-store";
import {
  Group,
  GroupMetadata,
  GroupStore,
  GroupWithData,
  groupMetadata,
} from "topics/group";

export class LocalGroupStore extends GroupStore {
  localFileStore: LocalFileStore;
  dataFileStore: LocalFileStore;

  constructor(diskPath?: string) {
    super();
    this.localFileStore = new LocalFileStore("groups", diskPath);
    this.dataFileStore = new LocalFileStore("groups-data", diskPath);
  }

  async all(): Promise<Group[]> {
    const groups: Group[] = [];
    for (const groupName of await this.localFileStore.list("./")) {
      for (const filename of await this.localFileStore.list(groupName)) {
        groups.push(await this.load(`${groupName}/${filename}`));
      }
    }
    return groups;
  }

  async load(filename: string): Promise<Group> {
    const group: GroupMetadata = await this.localFileStore.read(filename);
    return {
      ...group,
      data: () => this.dataFileStore.read(this.filename(group)),
    };
  }

  async save(group: GroupWithData): Promise<void> {
    await this.localFileStore.write(this.filename(group), groupMetadata(group));
    await this.dataFileStore.write(this.filename(group), group.data);
  }

  async reset(): Promise<void> {
    this.localFileStore.reset();
  }
}
