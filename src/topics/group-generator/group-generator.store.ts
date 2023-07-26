import { GenerationFrequency } from "topics/group-generator/group-generator.types";

export type GroupGeneratorGeneration = {
  name: string;
  timestamp: number;
  generationFrequency?: GenerationFrequency;
  lastGenerationDuration?: number;
};

export type GroupGeneratorSearch = {
  generatorName: string;
  latest?: boolean;
};

export abstract class GroupGeneratorStore {
  public abstract all(): Promise<GroupGeneratorGeneration[]>;
  public abstract reset(): Promise<void>;
  public abstract save(groupGeneratorExec: GroupGeneratorGeneration): Promise<void>;

  public async search({
    generatorName,
    latest,
  }: GroupGeneratorSearch): Promise<GroupGeneratorGeneration[]> {
    const groupGenerators = (await this.all()).filter(
      (groupGenerator) => groupGenerator.name == generatorName
    );
    return latest ? this._latest(groupGenerators) : groupGenerators;
  }

  protected _latest(groupGeneratorExecs: GroupGeneratorGeneration[]) {
    if (groupGeneratorExecs.length == 0) {
      return [];
    }
    let latest = groupGeneratorExecs[0];
    for (const item of groupGeneratorExecs) {
      if (item.timestamp > latest.timestamp) {
        latest = item;
      }
    }
    return [latest];
  }
}
