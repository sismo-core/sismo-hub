import {
  RegistryTreeBuilder,
  RegistryTreeConfiguration,
} from "./attester.types";
import {
  AttesterComputeContext,
  AttesterConstructorArgs,
  RegistryTreesConfigurationsLibrary,
  ComputeOptions,
  Network,
} from ".";
import { initRegistryTree } from "@badges-metadata/base/hydra-s1";
import { FileStore } from "file-store";
import { LoggerService } from "logger/logger";
import { AvailableDataStore, AvailableData } from "topics/available-data";
import { GroupStore } from "topics/group";
import { GroupSnapshotStore } from "topics/group-snapshot";

export class AttesterService {
  attesters: RegistryTreesConfigurationsLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  logger: LoggerService;
  configuredNetworks: Network[];

  constructor({
    attesters,
    availableDataStore,
    availableGroupStore,
    groupStore,
    groupSnapshotStore,
    logger,
    networks,
  }: AttesterConstructorArgs) {
    this.attesters = attesters;
    this.availableDataStore = availableDataStore;
    this.availableGroupStore = availableGroupStore;
    this.groupStore = groupStore;
    this.groupSnapshotStore = groupSnapshotStore;
    this.logger = logger;
    this.configuredNetworks = networks;
  }

  public async compute(
    attesterName: string,
    network: Network,
    { sendOnChain, generationTimestamp, dryRun }: ComputeOptions = {}
  ) {
    if (!this.configuredNetworks.includes(network)) {
      throw new Error(
        `The network ${network} is not configured for this attester.`
      );
    }

    const registryTreeConfiguration = this.getAttesterConfig(attesterName);

    this.logger.info(`Sending groups on ${network} chain`);

    const context: AttesterComputeContext = {
      name: attesterName,
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
      attesterName,
      network,
      isOnChain: sendOnChain == true,
      latest: true,
    });
    const currentIdentifier =
      lastAvailableData.length > 0 ? lastAvailableData[0].identifier : "";

    const newIdentifier = await registryTree.makeGroupsAvailable();

    const diff = await registryTree.getGroupsAvailableDiff(
      currentIdentifier,
      newIdentifier
    );
    this.logger.info(diff);

    const availableData: AvailableData = {
      attesterName: registryTreeConfiguration.name,
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
      const isIdentifierSaved = lastAvailableData.find(
        (ad) => ad.identifier === newIdentifier
      );
      if (!isIdentifierSaved) {
        availableData.transactionHash = await registryTree.sendOnChain(
          newIdentifier
        );
        await this.availableDataStore.save(availableData);
      } else {
        this.logger.info(
          `Attester ${attesterName} on ${network} root already on chain (${newIdentifier})`
        );
        return availableData;
      }
    } else {
      await this.availableDataStore.save(availableData);
    }

    if (sendOnChain) {
      await registryTree.removeOnChain(newIdentifier);
    }

    return availableData;
  }

  public getAttesterConfig(attesterName: string): RegistryTreeConfiguration {
    const attester = this.attesters[attesterName];
    if (!attester) {
      throw new Error(`Attester "${attesterName}" does not exists`);
    }
    return attester;
  }
}
