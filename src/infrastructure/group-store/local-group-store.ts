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

  async all(): Promise<{ [name: string]: Group }> {
    const groups: { [name: string]: Group } = {};
    for (const groupName of await this.localFileStore.list("./")) {
      for (const filename of await this.localFileStore.list(groupName)) {
        groups[groupName] = await this.load(`${groupName}/${filename}`);
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
      id: await this.getNewId(group.name),
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
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.dataFileStore.write(
      this.resolvedFilename(group),
      group.resolvedIdentifierData
    );
    return this.load(this.filename(group));
  }

  public async updateMetadata(
    group: GroupMetadata & { id: string }
  ): Promise<Group> {
    await this.localFileStore.write(this.filename(group), {
      ...group,
      id: group.id,
    });
    return this.load(this.filename(group));
  }

  async delete(group: Group): Promise<void> {
    await this.localFileStore.delete(this.filename(group));
    await this.dataFileStore.delete(this.filename(group));
    await this.dataFileStore.delete(this.resolvedFilename(group));
  }

  async reset(): Promise<void> {
    this.localFileStore.reset();
  }
}
