import { v4 as uuid } from "uuid";
import { LocalFileStore } from "infrastructure/file-store";
import {
  Group,
  GroupMetadata,
  GroupStore,
  groupMetadata,
  ResolvedGroupWithData,
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
    const group: GroupMetadata & { id: string } =
      await this.localFileStore.read(filename);
    return {
      ...group,
      data: () => this.dataFileStore.read(this.filename(group)),
      resolvedIdentifierData: () =>
        this.dataFileStore.read(this.resolvedFilename(group)),
    };
  }

  async save(group: ResolvedGroupWithData): Promise<Group> {
    await this.localFileStore.write(this.filename(group), {
      ...groupMetadata(group),
      id: uuid(),
    });
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.dataFileStore.write(
      this.resolvedFilename(group),
      group.resolvedIdentifierData
    );

    return this.load(this.filename(group));
  }

  public async update(
    group: ResolvedGroupWithData & { id: string }
  ): Promise<Group> {
    await this.localFileStore.write(this.filename(group), {
      ...groupMetadata(group),
      id: group.id,
    });
    return this.load(this.filename(group));
  }

  async reset(): Promise<void> {
    this.localFileStore.reset();
  }
}
