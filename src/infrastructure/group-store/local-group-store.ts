import {
  Group,
  GroupMetadata,
  GroupStore,
  GroupWithData,
  groupMetadata,
} from "../../topics/group";
import { LocalFileStore } from "../file-store";

export class LocalGroupStore extends GroupStore {
  localFileStore: LocalFileStore;

  constructor(prefix?: string) {
    super();
    prefix = prefix ?? "groups";
    this.localFileStore = new LocalFileStore(prefix);
  }

  async all(): Promise<Group[]> {
    const groups: Group[] = [];
    for (const groupName of await this.localFileStore.list("./")) {
      for (const filename of await this.localFileStore.list(groupName)) {
        if (!filename.endsWith(".data.json")) {
          groups.push(await this.load(`${groupName}/${filename}`));
        }
      }
    }
    return groups;
  }

  dataUrl(group: GroupMetadata): string {
    return this.localFileStore.url(this.dataFilename(group));
  }

  async load(filename: string): Promise<Group> {
    const group: GroupMetadata = await this.localFileStore.read(filename);
    return {
      ...group,
      data: () => this.localFileStore.read(this.dataFilename(group)),
    };
  }

  async save(group: GroupWithData): Promise<void> {
    await this.localFileStore.write(this.filename(group), groupMetadata(group));
    await this.localFileStore.write(this.dataFilename(group), group.data);
  }

  async reset(): Promise<void> {
    this.localFileStore.reset();
  }

  protected filename(group: GroupMetadata) {
    return `${group.name}/${group.timestamp}.json`;
  }
  protected dataFilename(group: GroupMetadata) {
    return `${group.name}/${group.timestamp}.data.json`;
  }
}
