import {
  GenerateGroupOptions,
  GenerateAllGroupsOptions,
  GenerationContext,
  GroupGeneratorServiceConstructorArgs,
  GroupGeneratorsLibrary,
} from "./group-generator.types";
import { LoggerService } from "logger/logger";
import { FetchedData, GroupStore, Properties } from "topics/group";
import { GroupGeneratorStore } from "topics/group-generator";
import { GlobalResolver } from "topics/resolver/global-resolver";

export class GroupGeneratorService {
  groupGenerators: GroupGeneratorsLibrary;
  groupStore: GroupStore;
  groupGeneratorStore: GroupGeneratorStore;
  globalResolver: GlobalResolver;
  logger: LoggerService;

  constructor({
    groupGenerators,
    groupStore,
    groupGeneratorStore,
    globalResolver,
    logger,
  }: GroupGeneratorServiceConstructorArgs) {
    this.groupGenerators = groupGenerators;
    this.groupStore = groupStore;
    this.groupGeneratorStore = groupGeneratorStore;
    this.globalResolver = globalResolver;
    this.logger = logger;
  }

  get generators(): GroupGeneratorsLibrary {
    return this.groupGenerators;
  }

  public async generateAllGroups({
    frequency,
    timestamp,
    additionalData,
    lastGenerationTimeInterval,
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
    } else {
      generatorsName = sortedLevelsOfDependencies.map((x) => x[0]);
    }

    for (const generatorName of generatorsName) {
      await this.generateGroupsWithRetry(generatorName, {
        timestamp,
        additionalData,
        lastGenerationTimeInterval,
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
    {
      timestamp,
      additionalData,
      lastGenerationTimeInterval,
      firstGenerationOnly,
    }: GenerateGroupOptions
  ) {
    const lastGenerations = await this.groupGeneratorStore.search({
      generatorName,
      latest: true,
    });

    const context = await this.createContext({ timestamp });

    if (lastGenerations.length > 0) {
      if (
        context.timestamp - lastGenerations[0].timestamp <
        (lastGenerationTimeInterval ?? 0)
      ) {
        // 12 hours
        this.logger.info(
          `${generatorName} already generated too recently (${new Date(
            lastGenerations[0].timestamp * 1000
          )}). Skipping`
        );
        return;
      }

      if (firstGenerationOnly) {
        this.logger.info(
          `${generatorName} already generated at ${new Date(
            lastGenerations[0].timestamp * 1000
          )}. Skipping`
        );
        return;
      }
    }

    const generator = this.groupGenerators[generatorName];

    this.logger.info(`Generating groups (${generatorName})`);
    const groups = await generator.generate(context, this.groupStore);

    for (const group of groups) {
      group.generatedBy = generatorName;
      group.data = this.addAdditionalData(group.data, additionalData);
      const { updatedRawData, resolvedIdentifierData, accountTypes } =
        await this.globalResolver.resolveAll(group.data);
      group.data = this.formatGroupData(updatedRawData);
      group.accountSources = accountTypes;

      group.properties = this.computeProperties(group.data);

      await this.groupStore.save({ ...group, resolvedIdentifierData });

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

  public async generateGroupsWithRetry(
    generatorName: string,
    {
      timestamp,
      additionalData,
      lastGenerationTimeInterval,
      firstGenerationOnly,
    }: GenerateGroupOptions,
    retryCounter = 4
  ) {
    try {
      await this.generateGroups(generatorName, {
        timestamp,
        additionalData,
        lastGenerationTimeInterval,
        firstGenerationOnly,
      });
    } catch (error) {
      if (retryCounter < 0) {
        this.logger.error(error);
        this.logger.error(
          `Encountered multiple errors with the group generator ${generatorName}. A fix on the data fetching is needed.`
        );
      } else {
        this.logger.info(
          `Tries again for group generator ${generatorName}, ${retryCounter} retries left.`
        );
        this.generateGroupsWithRetry(
          generatorName,
          {
            timestamp,
            additionalData,
            lastGenerationTimeInterval,
            firstGenerationOnly,
          },
          retryCounter - 1
        );
      }
    }
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
      Object.entries(data).map(([k, v]) => {
        if (/^0x[a-fA-F0-9]{40}$/.test(k)) {
          return [k.toLowerCase(), v.toString()];
        }
        return [k, v.toString()];
      })
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

  public computeProperties(data: FetchedData): Properties {
    const valueDistribution: { [tier: number]: number } = {};
    let accountsNumber = 0;
    Object.values(data).map((tier: any) => {
      const tierString = tier;
      valueDistribution[tierString]
        ? (valueDistribution[tierString] += 1)
        : (valueDistribution[tierString] = 1);
      accountsNumber++;
    });

    return {
      accountsNumber,
      valueDistribution,
    };
  }

  public static parseAdditionalData(additionalData: string): FetchedData {
    const data: FetchedData = {};
    for (const addressData of additionalData.split(",")) {
      if (addressData == "") {
        continue;
      }
      const [address, valueStr] = addressData.split("=", 2);
      const value = Number(valueStr ?? "1");
      if (isNaN(value)) {
        throw new Error("Error parsing additional data");
      }
      data[address] = value;
    }
    return data;
  }
}
