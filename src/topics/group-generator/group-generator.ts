import {
  GenerateGroupOptions,
  GenerateAllGroupsOptions,
  GenerationContext,
  GroupGeneratorServiceConstructorArgs,
  GroupGeneratorsLibrary,
} from "./group-generator.types";
import { LoggerService } from "logger/logger";
import { FetchedData, GroupStore } from "topics/group";
import { GroupGeneratorStore } from "topics/group-generator";

export class GroupGeneratorService {
  groupGenerators: GroupGeneratorsLibrary;
  groupStore: GroupStore;
  groupGeneratorStore: GroupGeneratorStore;
  logger: LoggerService;

  constructor({
    groupGenerators,
    groupStore,
    groupGeneratorStore,
    logger,
  }: GroupGeneratorServiceConstructorArgs) {
    this.groupGenerators = groupGenerators;
    this.groupStore = groupStore;
    this.groupGeneratorStore = groupGeneratorStore;
    this.logger = logger;
  }

  get generators(): GroupGeneratorsLibrary {
    return this.groupGenerators;
  }

  public async generateAllGroups({
    frequency,
    timestamp,
    additionalData,
    firstGenerationOnly,
  }: GenerateAllGroupsOptions) {
    let generatorsName: string[] = Object.keys(this.groupGenerators);

    const levelOfDependencies: { [name: string]: number } =
      this.computeLevelOfDependencies(generatorsName);

    // sort descending
    const sortedLevelsOfDependencies = Object.entries(levelOfDependencies).sort(
      (a, b) => {
        return b[1] - a[1];
      }
    );

    if (frequency) {
      generatorsName = sortedLevelsOfDependencies
        .map((x) => x[0])
        .filter(
          (generatorName) =>
            this.groupGenerators[generatorName].generationFrequency ===
            frequency
        );
    }

    for (const generatorName of generatorsName) {
      await this.generateGroups(generatorName, {
        timestamp,
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

  public async generateGroups(
    generatorName: string,
    { timestamp, additionalData, firstGenerationOnly }: GenerateGroupOptions
  ) {
    const lastGenerations = await this.groupGeneratorStore.search({
      generatorName,
      latest: true,
    });
    if (firstGenerationOnly && lastGenerations.length > 0) {
      this.logger.info(
        `${generatorName} already generated at ${new Date(
          lastGenerations[0].timestamp * 1000
        )}. Skipping`
      );
      return;
    }

    const context = await this.createContext({ timestamp });
    const generator = this.groupGenerators[generatorName];

    this.logger.info(`Generating groups (${generatorName})`);
    const groups = await generator.generate(context, this.groupStore);

    for (const group of groups) {
      group.data = this.addAdditionalData(group.data, additionalData);
      group.data = this.formatGroupData(group.data);

      await this.groupStore.save(group);
      this.logger.info(
        `Group ${group.name} containing ${
          Object.keys(group.data).length
        } elements saved.`
      );
    }

    await this.groupGeneratorStore.save({
      name: generatorName,
      timestamp: context.timestamp,
    });
  }

  public async createContext({
    timestamp,
  }: GenerateGroupOptions): Promise<GenerationContext> {
    return {
      timestamp: timestamp ?? Math.floor(Date.now() / 1000),
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
    if (additionalData !== undefined) {
      this.logger.info(
        `Inserting ${Object.keys(additionalData).length} additional data `
      );
      return {
        ...data,
        ...additionalData,
      };
    }
    return data;
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
