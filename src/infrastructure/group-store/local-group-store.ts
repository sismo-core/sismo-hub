import { FetchedData, Group, GroupStore } from "../../topics/group";
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

  dataUrl(group: Group): string {
    return this.localFileStore.url(`${group.filename}.data.json`);
  }

  async getData(group: Group): Promise<FetchedData> {
    return await this.localFileStore.read(`${group.filename}.data.json`);
  }

  async load(filename: string): Promise<Group> {
    return new Group(this, await this.localFileStore.read(filename));
  }

  async save(group: Group): Promise<void> {
    await this.localFileStore.write(`${group.filename}.json`, group.json);
    await this.localFileStore.write(
      `${group.filename}.data.json`,
      await group.data()
    );
  }

  reset(): void {
    this.localFileStore.reset();
  }
}
