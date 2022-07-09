import GroupStore from "../group/group.store"
import { Group } from "../group";
import LocalFileStore from "./local-file-store";

export default class LocalGroupStore extends GroupStore {
  localFileStore = new LocalFileStore()

  async all(name: string): Promise<Group[]> {
    return Promise.all(
      (await this.localFileStore.list(name))
        .filter((filename) => filename.endsWith(".metadatas.json"))
        .map(async (filename) => await this.load(`${name}/${filename}`))
    )
  }

  async load(filename: string): Promise<Group> {
    return await this.localFileStore.read(filename)
  }

  async save(group: Group): Promise<void> {
    await this.localFileStore.write(
      `${group.filename()}.metadatas.json`,
      {
        name: group.name,
        generationDate: group.generationDate,
        valueType: group.valueType,
        tags: group.tags,
      }
    )
  }

}