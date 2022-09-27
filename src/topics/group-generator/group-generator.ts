import {
  GenerateGroupOptions,
  GenerateAllGroupsOptions,
  GenerationContext,
  GroupGeneratorServiceConstructorArgs,
  GroupGenerator,
  GroupGeneratorsLibrary,
} from "./group-generator.types";
import { getCurrentBlockNumber } from "helpers";
import { FetchedData, GroupStore } from "topics/group";

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

  public async generateAllGroups({
    frequency,
    timestamp,
    blockNumber,
    additionalData,
  }: GenerateAllGroupsOptions) {
    let generators: [string, GroupGenerator][] = Object.entries(
      this.groupGenerators
    );

    if (frequency) {
      generators = this.selectGroupGeneratorsWithFrequency(
        frequency,
        generators
      );
    }

    const levelOfDependencies: { [name: string]: number } =
      this.computeLevelOfDependencies(generators);

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
      });
    }
  }

  public selectGroupGeneratorsWithFrequency(
    frequency: string,
    generators: [string, GroupGenerator][]
  ) {
    return generators.filter(
      ([, groupGenerator]) => groupGenerator.generationFrequency === frequency
    );
  }

  public computeLevelOfDependencies(
    generators: [string, GroupGenerator][],
    levels: { [name: string]: number } = {}
  ) {
    generators.forEach(async ([name, generatorName]) => {
      if (generatorName.dependsOn) {
        levels = this.computeLevelOfDependencies(
          generatorName.dependsOn.map((name) => [
            name,
            this.groupGenerators[name],
          ]),
          levels
        );
      }
      if (!levels[name]) {
        levels[name] = 1;
      } else {
        levels[name] += 1;
      }
    });

    return levels;
  }

  public async generateGroups(
    generatorName: string,
    { blockNumber, timestamp, additionalData }: GenerateGroupOptions
  ) {
    const context = await this.createContext({ blockNumber, timestamp });
    const generator = this.groupGenerators[generatorName];

    const groups = await generator.generate(context, this.groupStore);
    for (const group of groups) {
      group.data = this.addAdditionalData(group.data, additionalData);
      group.data = this.formatGroupData(group.data);
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
