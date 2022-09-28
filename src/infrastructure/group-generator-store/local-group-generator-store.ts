import { LocalFileStore } from "infrastructure/file-store";
import {
  GroupGeneratorGeneration,
  GroupGeneratorStore,
} from "topics/group-generator";

export class LocalGroupGeneratorStore extends GroupGeneratorStore {
  localFileStore: LocalFileStore;

  constructor(diskPath?: string) {
    super();
    this.localFileStore = new LocalFileStore("group-generator", diskPath);
  }

  async all(): Promise<GroupGeneratorGeneration[]> {
    const groupGeneratorExecs: GroupGeneratorGeneration[] = [];
    for (const attesterName of await this.localFileStore.list("./")) {
      for (const filename of await this.localFileStore.list(attesterName)) {
        groupGeneratorExecs.push(
          await this.load(`${attesterName}/${filename}`)
        );
      }
    }
    return groupGeneratorExecs;
  }

  async load(filename: string): Promise<GroupGeneratorGeneration> {
    return await this.localFileStore.read(filename);
  }

  static filename(groupGeneratorExec: GroupGeneratorGeneration) {
    return `${groupGeneratorExec.name}/${groupGeneratorExec.timestamp}.json`;
  }

  async save(groupGeneratorExec: GroupGeneratorGeneration): Promise<void> {
    await this.localFileStore.write(
      LocalGroupGeneratorStore.filename(groupGeneratorExec),
      groupGeneratorExec
    );
  }

  async reset(): Promise<void> {
    this.localFileStore.reset();
  }
}
