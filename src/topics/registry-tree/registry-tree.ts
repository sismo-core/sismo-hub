import { RegistryTreeBuilder, RegistryTreeConfiguration } from "./registry-tree.types";
import {
  RegistryTreeComputeContext,
  RegistryTreeServiceConstructorArgs,
  RegistryTreesConfigurationsLibrary,
  ComputeOptions,
  Network,
} from ".";
import { initRegistryTree } from "@badges-metadata/base/hydra";
import { FileStore } from "file-store";
import { LoggerService } from "logger/logger";
import { AvailableDataStore, AvailableData } from "topics/available-data";
import { GroupStore } from "topics/group";
import { GroupSnapshotStore } from "topics/group-snapshot";

export class RegistryTreeService {
  registryTreesConfigurations: RegistryTreesConfigurationsLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  logger: LoggerService;
  configuredNetworks: Network[];

  constructor({
    registryTreesConfigurations,
    availableDataStore,
    availableGroupStore,
    groupStore,
    groupSnapshotStore,
    logger,
    networks,
  }: RegistryTreeServiceConstructorArgs) {
    this.registryTreesConfigurations = registryTreesConfigurations;
    this.availableDataStore = availableDataStore;
    this.availableGroupStore = availableGroupStore;
    this.groupStore = groupStore;
    this.groupSnapshotStore = groupSnapshotStore;
    this.logger = logger;
    this.configuredNetworks = networks;
  }

  public async compute(
    registryTreeName: string,
    network: Network,
    { sendOnChain, generationTimestamp, dryRun }: ComputeOptions = {}
  ) {
    if (!this.configuredNetworks.includes(network)) {
      throw new Error(`The network ${network} is not configured for this registry tree config.`);
    }

    const registryTreeConfiguration = this.getRegistryTreeConfig(registryTreeName);

    this.logger.info(`Sending groups on ${network} chain`);

    const context: RegistryTreeComputeContext = {
      name: registryTreeName,
      network,
      generationTimestamp: generationTimestamp ?? Math.floor(Date.now() / 1000),
      groupStore: this.groupStore,
      groupSnapshotStore: this.groupSnapshotStore,
      availableDataStore: this.availableDataStore,
      availableGroupStore: this.availableGroupStore,
      logger: this.logger,
    };

    const registryTree: RegistryTreeBuilder = initRegistryTree(
      context,
      registryTreeConfiguration,
      network
    );

    const lastAvailableData = await this.availableDataStore.search({
      registryTreeName: registryTreeName,
      network,
      isOnChain: sendOnChain == true,
      latest: true,
    });
    const currentIdentifier = lastAvailableData.length > 0 ? lastAvailableData[0].identifier : "";

    const newIdentifier = await registryTree.makeGroupsAvailable();

    const diff = await registryTree.getGroupsAvailableDiff(currentIdentifier, newIdentifier);
    this.logger.info(diff);

    const availableData: AvailableData = {
      registryTreeName: registryTreeConfiguration.name,
      timestamp: context.generationTimestamp,
      network,
      identifier: newIdentifier,
      isOnChain: sendOnChain == true,
    };

    if (dryRun) {
      this.logger.info("Dry run mode, not saving available data.");
      return availableData;
    }

    if (sendOnChain) {
      const isIdentifierSaved = lastAvailableData.find((ad) => ad.identifier === newIdentifier);
      if (!isIdentifierSaved) {
        availableData.transactionHash = await registryTree.sendOnChain(newIdentifier);
        await this.availableDataStore.save(availableData);
      } else {
        this.logger.info(
          `Registry tree ${registryTreeName} on ${network} root already on chain (${newIdentifier})`
        );
        return availableData;
      }
    } else {
      await this.availableDataStore.save(availableData);
    }

    if (sendOnChain) {
      await registryTree.removeOnChain(newIdentifier, currentIdentifier);
    }

    return availableData;
  }

  public getRegistryTreeConfig(registryTreeName: string): RegistryTreeConfiguration {
    const attester = this.registryTreesConfigurations[registryTreeName];
    if (!attester) {
      throw new Error(`Registry tree "${registryTreeName}" does not exists`);
    }
    return attester;
  }
}
