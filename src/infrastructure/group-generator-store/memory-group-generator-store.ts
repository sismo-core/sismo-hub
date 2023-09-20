import { GroupGeneratorGeneration, GroupGeneratorStore } from "topics/group-generator";

export class MemoryGroupGeneratorStore extends GroupGeneratorStore {
  protected _store: { [key: string]: GroupGeneratorGeneration } = {};

  async all(): Promise<GroupGeneratorGeneration[]> {
    return Object.values(this._store);
  }

  async reset(): Promise<void> {
    this._store = {};
  }

  async save(groupGeneratorExec: GroupGeneratorGeneration): Promise<void> {
    this._store[`${groupGeneratorExec.name}/${groupGeneratorExec.timestamp}`] = groupGeneratorExec;
  }
}
