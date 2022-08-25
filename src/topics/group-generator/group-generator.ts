import {
  GenerateGroupOptions,
  GenerationContext,
  GroupGeneratorServiceConstructorArgs,
  GroupGeneratorsLibrary,
} from "./group-generator.types";
import { getCurrentBlockNumber } from "helpers";
import { GroupStore } from "topics/group";

export class GroupGeneratorService {
  groupGenerators: GroupGeneratorsLibrary;
  groupStore: GroupStore;

  constructor({
    groupGenerators,
    groupStore,
  }: GroupGeneratorServiceConstructorArgs) {
    this.groupGenerators = groupGenerators;
    this.groupStore = groupStore;
  }

  get generators(): GroupGeneratorsLibrary {
    return this.groupGenerators;
  }

  public async generateGroups(
    generatorName: string,
    options: GenerateGroupOptions
  ) {
    const context = await this.createContext(options);
    const generator = this.groupGenerators[generatorName];

    const groups = await generator.generate(context, this.groupStore);
    for (const group of groups) {
      await this.groupStore.save(group);
    }
  }

  public async createContext({
    blockNumber,
    timestamp,
  }: GenerateGroupOptions): Promise<GenerationContext> {
    return {
      timestamp: timestamp ?? Math.floor(Date.now() / 1000),
      blockNumber: blockNumber ?? (await getCurrentBlockNumber()),
    };
  }
}
