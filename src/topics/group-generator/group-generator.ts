import {
  GenerateGroupOptions,
  GenerateAllGroupsOptions,
  GenerationContext,
  GroupGeneratorServiceConstructorArgs,
  GroupGeneratorsLibrary,
} from "./group-generator.types";
import { getCurrentBlockNumber } from "helpers";
import { FetchedData, GroupStore } from "topics/group";
import { GroupGeneratorStore } from "topics/group-generator";

export class GroupGeneratorService {
  groupGenerators: GroupGeneratorsLibrary;
  groupStore: GroupStore;
  groupGeneratorStore: GroupGeneratorStore;

  constructor({
    groupGenerators,
    groupStore,
    groupGeneratorStore,
  }: GroupGeneratorServiceConstructorArgs) {
    this.groupGenerators = groupGenerators;
    this.groupStore = groupStore;
    this.groupGeneratorStore = groupGeneratorStore;
  }

  get generators(): GroupGeneratorsLibrary {
    return this.groupGenerators;
  }

  public async generateAllGroups({
    frequency,
    timestamp,
    blockNumber,
    additionalData,
    firstGenerationOnly,
  }: GenerateAllGroupsOptions) {
    let generatorsName: string[] = Object.keys(this.groupGenerators);

    if (frequency) {
      generatorsName = Object.keys(this.groupGenerators).filter(
        (generatorName) =>
          this.groupGenerators[generatorName].generationFrequency === frequency
      );
    }

    const levelOfDependencies: { [name: string]: number } =
      this.computeLevelOfDependencies(generatorsName);

    // sort descending
    const sortedLevelsOfDependencies = Object.entries(levelOfDependencies).sort(
      (a, b) => {
        return b[1] - a[1];
      }
    );

    for (let i = 0; i < sortedLevelsOfDependencies.length; i++) {
      const generatorName = sortedLevelsOfDependencies[i][0];
      await this.generateGroups(generatorName, {
        timestamp,
        blockNumber,
        additionalData,
        firstGenerationOnly,
      });
    }
  }

  public computeLevelOfDependencies(
    generators: string[],
    levels: { [name: string]: number } = {}
  ) {
    generators.forEach(async (name) => {
      const generator = this.groupGenerators[name];
      if (generator.dependsOn) {
        levels = this.computeLevelOfDependencies(generator.dependsOn, levels);
      }
      if (!levels[name]) {
        levels[name] = 1;
      } else {
        levels[name] += 1;
      }
    });
    return levels;
  }

  public async generatorAlreadyGenerated(
    generatorName: string
  ): Promise<boolean> {
    const lastGenerations = await this.groupGeneratorStore.search({
      generatorName,
      latest: true,
    });
    if (lastGenerations.length > 0) {
      return true;
    }
    return false;
  }

  public async generateGroups(
    generatorName: string,
    {
      blockNumber,
      timestamp,
      additionalData,
      firstGenerationOnly,
    }: GenerateGroupOptions
  ) {
    if (
      firstGenerationOnly &&
      (await this.generatorAlreadyGenerated(generatorName))
    ) {
      return;
    }

    const context = await this.createContext({ blockNumber, timestamp });
    const generator = this.groupGenerators[generatorName];

    console.log(`Generating groups (${generatorName})`);
    const groups = await generator.generate(context, this.groupStore);
    for (const group of groups) {
      group.data = this.addAdditionalData(group.data, additionalData);
      group.data = this.formatGroupData(group.data);
      await this.groupStore.save(group);
    }

    await this.groupGeneratorStore.save({
      name: generatorName,
      timestamp: context.timestamp,
    });
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

  private formatGroupData(data: FetchedData): FetchedData {
    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k.toLowerCase(), v.toString()])
    );
  }

  private addAdditionalData(
    data: FetchedData,
    additionalData?: FetchedData
  ): FetchedData {
    return additionalData == undefined
      ? data
      : {
          ...data,
          ...additionalData,
        };
  }

  public static parseAdditionalData(additionalData: string): FetchedData {
    const data: FetchedData = {};
    const ethereumAddressRegex = new RegExp("^0x[a-fA-F0-9]{40}$");
    for (const addressData of additionalData.split(",")) {
      if (addressData == "") {
        continue;
      }
      const [address, valueStr] = addressData.split("=", 2);
      const value = Number(valueStr ?? "1");
      if (isNaN(value)) {
        throw new Error("Error parsing additional data");
      }
      if (!ethereumAddressRegex.test(address)) {
        throw new Error(`${address} is not an ethereum address`);
      }
      data[address] = value;
    }
    return data;
  }
}
