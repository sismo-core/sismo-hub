import { Group } from "../../topics/group";
import GroupStore from "../../topics/group/group.store";
import LocalFileStore from "../file-store/local-file-store";

export default class LocalGroupStore extends GroupStore {
  localFileStore = new LocalFileStore("groups");

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
    return await this.localFileStore.read(filename);
  }

  async save(group: Group): Promise<void> {
    await this.localFileStore.write(`${group.filename()}.json`, group.toJson());
  }
}
