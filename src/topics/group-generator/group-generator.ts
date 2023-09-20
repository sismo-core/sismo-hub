import { BigNumber } from "ethers";
import {
  GenerateGroupOptions,
  GenerateAllGroupsOptions,
  GenerationContext,
  GroupGeneratorServiceConstructorArgs,
  GroupGeneratorsLibrary,
} from "./group-generator.types";
import { chunkArray } from "helpers/chunk-array";
import { LoggerService } from "logger/logger";
import {
  FetchedData,
  Group,
  groupMetadata,
  GroupStore,
  GroupWithData,
  Properties,
  ResolvedGroupWithData,
} from "topics/group";
import { GroupGeneratorStore } from "topics/group-generator";
import {
  GroupSnapshot,
  GroupSnapshotStore,
  ResolvedGroupSnapshotWithData,
} from "topics/group-snapshot";
import { GlobalResolver } from "topics/resolver/global-resolver";

export class GroupGeneratorService {
  groupGenerators: GroupGeneratorsLibrary;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  groupGeneratorStore: GroupGeneratorStore;
  globalResolver: GlobalResolver;
  logger: LoggerService;

  constructor({
    groupGenerators,
    groupStore,
    groupSnapshotStore,
    groupGeneratorStore,
    globalResolver,
    logger,
  }: GroupGeneratorServiceConstructorArgs) {
    this.groupGenerators = groupGenerators;
    this.groupStore = groupStore;
    this.groupSnapshotStore = groupSnapshotStore;
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

    // if first generation only, should filter for only non existing groupGenerators
    // doing this filtering here hugely speeds up the process
    if (firstGenerationOnly) {
      const groupAlreadyGenerated: string[] = [];
      for (const chunk of chunkArray(Object.keys(this.groupGenerators), 100)) {
        const resolvedChunks = await Promise.all(
          chunk.map((groupGeneratorName) =>
            this.groupGeneratorStore.search({ generatorName: groupGeneratorName, latest: true })
          )
        );
        for (const groupGeneration of resolvedChunks) {
          groupAlreadyGenerated.push(groupGeneration[0]?.name);
        }
      }
      generatorsName = generatorsName.filter(
        (generatorName) =>
          !groupAlreadyGenerated.find((groupGeneratorName) => groupGeneratorName === generatorName)
      );
    }

    const levelOfDependencies: { [name: string]: number } =
      this.computeLevelOfDependencies(generatorsName);

    // sort descending
    const sortedLevelsOfDependencies = Object.entries(levelOfDependencies).sort((a, b) => {
      return b[1] - a[1];
    });

    if (frequency) {
      generatorsName = sortedLevelsOfDependencies
        .map((x) => x[0])
        .filter(
          (generatorName) => this.groupGenerators[generatorName].generationFrequency === frequency
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

  public computeLevelOfDependencies(generators: string[], levels: { [name: string]: number } = {}) {
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
    generatorNames: string,
    {
      timestamp,
      additionalData,
      lastGenerationTimeInterval,
      firstGenerationOnly,
    }: GenerateGroupOptions
  ) {
    const generatorNamesArray = generatorNames.split(",");
    return Promise.all(
      generatorNamesArray.map((generatorName) =>
        this.generateGroup(generatorName, {
          timestamp,
          additionalData,
          lastGenerationTimeInterval,
          firstGenerationOnly,
        })
      )
    ).then((groups) => groups.flat());
  }

  public async generateGroup(
    generatorName: string,
    {
      timestamp,
      additionalData,
      lastGenerationTimeInterval,
      firstGenerationOnly,
    }: GenerateGroupOptions
  ) {
    const startGeneration = Date.now();

    const lastGenerations = await this.groupGeneratorStore.search({
      generatorName,
      latest: true,
    });

    const context = await this.createContext({ timestamp });

    if (lastGenerations.length > 0) {
      if (context.timestamp - lastGenerations[0].timestamp < (lastGenerationTimeInterval ?? 0)) {
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
    if (!generator) {
      throw new Error(
        `Group generator '${generatorName}' not found. Make sure the group generator exists.`
      );
    }
    this.logger.info(`Generating group snapshots with generator (${generatorName})`);
    const groups = await generator.generate(context, this.groupStore);

    const savedGroups: Group[] = [];
    for (const group of groups) {
      group.generatedBy = generatorName;
      group.data = this.addAdditionalData(group.data, additionalData);
      const { updatedRawData, resolvedIdentifierData, accountSources } =
        await this.globalResolver.resolveAll(group.data);
      group.data = this.formatGroupData(updatedRawData);
      group.accountSources = accountSources;

      savedGroups.push(await this.saveGroup({ ...group, resolvedIdentifierData }));
    }

    const endGeneration = Date.now();
    const executionTime = Math.floor((endGeneration - startGeneration) / 1000);

    await this.groupGeneratorStore.save({
      name: generatorName,
      timestamp: context.timestamp,
      lastGenerationDuration: executionTime,
      generationFrequency: generator.generationFrequency,
    });

    return savedGroups;
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

  public async saveGroup(group: ResolvedGroupWithData): Promise<Group> {
    if (group.description === "") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, resolvedIdentifierData, ...groupWithoutData } = group;
      this.logger.error(
        "Your group description is empty: \n" + JSON.stringify(groupWithoutData, null, 4) + "\n"
      );
      throw new Error("Group description cannot be an empty string (''), please provide one.");
    }

    let savedGroup = (
      await this.groupStore.search({
        groupName: group.name,
        latest: true,
      })
    )[0];

    if (!savedGroup) {
      const { newId } = await this.groupStore.getNewId(group.name);
      const groupSnapshot: ResolvedGroupSnapshotWithData = {
        groupId: newId,
        timestamp: group.timestamp,
        name: group.name,
        properties: this.computeProperties(group),
        data: group.data,
        resolvedIdentifierData: group.resolvedIdentifierData,
      };

      await this.groupSnapshotStore.save(groupSnapshot);

      this.logger.info(
        `New group snapshot for new group '${group.name}' with id ${newId} containing ${
          Object.keys(group.data).length
        } elements saved.`
      );

      savedGroup = await this.groupStore.save(group);
    } else {
      const groupSnapshot: ResolvedGroupSnapshotWithData = {
        groupId: savedGroup.id,
        timestamp: group.timestamp,
        name: savedGroup.name,
        properties: this.computeProperties(group),
        data: group.data,
        resolvedIdentifierData: group.resolvedIdentifierData,
      };

      await this.groupSnapshotStore.save(groupSnapshot);

      this.logger.info(
        `New group snapshot for already existing group '${group.name}' with id ${
          savedGroup.id
        } containing ${Object.keys(group.data).length} elements saved.`
      );

      savedGroup = await this.groupStore.update({
        ...savedGroup,
        displayName: group.displayName,
        description: group.description,
        specs: group.specs,
        accountSources: group.accountSources,
        valueType: group.valueType,
        data: group.data,
        resolvedIdentifierData: group.resolvedIdentifierData,
      });
    }

    this.logger.info(
      `The group snapshot has been stored locally here: \x1b[38;5;221m./disk-store/group-snapshots-data/${savedGroup.id}/${group.timestamp}.json\x1b[0m`
    );

    this.logger.info(
      `You can access it through the Sismo Hub API here: \x1b[38;5;12mhttp://localhost:8000/file-store/group-snapshots-data/${savedGroup.id}/${group.timestamp}.json\x1b[0m`
    );

    this.logger.info(
      `You can see its metadata here: \x1b[38;5;12m/groups/${savedGroup.id}?timestamp=${group.timestamp}\x1b[0m`
    );

    return savedGroup;
  }

  public async createContext({ timestamp }: GenerateGroupOptions): Promise<GenerationContext> {
    return {
      timestamp: timestamp ?? Math.floor(Date.now() / 1000),
    };
  }

  private formatGroupData(data: FetchedData): FetchedData {
    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => {
        if (!/^-?\d+$/.test(v.toString())) {
          throw new Error("Error in Group Format: values are not integers");
        }
        if (/^0x[a-fA-F0-9]{40}$/.test(k)) {
          return [k.toLowerCase(), v.toString()];
        }
        return [k, v.toString()];
      })
    );
  }

  private addAdditionalData(data: FetchedData, additionalData?: FetchedData): FetchedData {
    if (additionalData !== undefined) {
      this.logger.info(`Inserting ${Object.keys(additionalData).length} additional data `);
      return {
        ...data,
        ...additionalData,
      };
    }
    return data;
  }

  public computeProperties(group: ResolvedGroupWithData): Properties {
    const data = group.data;
    const valueDistribution: { [tier: number]: number } = {};
    let accountsNumber = 0;
    let minValue = "";
    let maxValue = "";

    Object.values(data).map((tier: any) => {
      const chosenTier = group.name === "sismo-contributors" ? tier : 1;
      valueDistribution[chosenTier] = (valueDistribution[chosenTier] || 0) + 1;

      accountsNumber++;

      if (minValue === "" || BigNumber.from(tier).lt(minValue)) {
        minValue = BigNumber.from(tier).toString();
      }
      if (maxValue === "" || BigNumber.from(tier).gt(maxValue)) {
        maxValue = BigNumber.from(tier).toString();
      }
    });

    return {
      accountsNumber,
      valueDistribution,
      minValue,
      maxValue,
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

  updateGroupsMetadata(generatorNames: string): Promise<Group[]> {
    const generatorNamesArray = generatorNames.split(",");
    return Promise.all(
      generatorNamesArray.map((generatorName) => this.updateGroupMetadata(generatorName))
    ).then((groups) => groups.flat());
  }

  public async updateGroupMetadata(generatorName: string): Promise<Group[]> {
    this.logger.info(`Updating metadatas for all groups generated with generator ${generatorName}`);
    const context = await this.createContext({});
    const generator = this.groupGenerators[generatorName];
    let groups: GroupWithData[] = [];
    try {
      groups = await generator.generate(context, this.groupStore);
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        `Error while generating groups for generator "${generatorName}". Does this generator exist?`
      );
    }

    const updatedGroups: Group[] = [];
    for (const group of groups) {
      group.generatedBy = generatorName;
      const savedGroup: Group = (
        await this.groupStore.search({
          groupName: group.name,
          latest: true,
        })
      )[0];
      if (!savedGroup) {
        throw new Error(
          `Error while retrieving group for generator "${generatorName}". Has the group "${group.name}" been generated?`
        );
      }
      const { accountSources } = await this.globalResolver.resolveAll(group.data);
      const updatedGroup: Group = await this.groupStore.updateMetadata({
        ...groupMetadata(group),
        accountSources: accountSources,
        id: savedGroup.id, // we don't want to update the id
        timestamp: savedGroup.timestamp, // we don't want to update the timestamp
      });
      updatedGroups.push(updatedGroup);
      this.logger.info(
        `Successfully updated metadata for group ${updatedGroup.name} with id ${updatedGroup.id}`
      );
    }
    return updatedGroups;
  }

  public async deleteGroups(groupNames: string): Promise<void> {
    const groupNamesArray = groupNames.split(",");
    for (const groupName of groupNamesArray) {
      await this.deleteGroup(groupName);
    }
  }

  public async deleteGroup(groupName: string): Promise<void> {
    const groups: Group[] = await this.groupStore.search({
      groupName: groupName,
      latest: true,
    });
    if (groups.length === 0) {
      throw new Error(
        `Error while retrieving group for group "${groupName}". Has a group already been created?`
      );
    }

    const group = groups[0];

    // delete all group snapshots from group
    const groupSnapshots: GroupSnapshot[] = await this.groupSnapshotStore.allByGroupId(group.id);
    for (const groupSnapshot of groupSnapshots) {
      await this.groupSnapshotStore.delete(groupSnapshot);
    }

    await this.groupStore.delete(group);
    this.logger.info(`Successfully deleted group ${group.name} (id ${group.id})`);
  }
}
