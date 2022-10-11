import {
  Attester,
  AttesterComputeContext,
  AttesterConstructorArgs,
  AttestersLibrary,
  ComputeOptions,
  GroupWithInternalCollectionId,
  Network,
} from ".";
import { FileStore } from "file-store";
import { LoggerService } from "logger/logger";
import { AvailableDataStore, AvailableData } from "topics/available-data";
import { GroupStore } from "topics/group";

export class AttesterService {
  attesters: AttestersLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
  logger: LoggerService;

  constructor({
    attesters,
    availableDataStore,
    availableGroupStore,
    groupStore,
    logger,
  }: AttesterConstructorArgs) {
    this.attesters = attesters;
    this.availableDataStore = availableDataStore;
    this.availableGroupStore = availableGroupStore;
    this.groupStore = groupStore;
    this.logger = logger;
  }

  public async compute(
    attesterName: string,
    network: Network,
    { sendOnChain, generationTimestamp, dryRun }: ComputeOptions = {}
  ) {
    const attester = this.getAttester(attesterName, network);

    const context: AttesterComputeContext = {
      name: attesterName,
      network,
      generationTimestamp: generationTimestamp ?? Math.floor(Date.now() / 1000),
      groupStore: this.groupStore,
      availableDataStore: this.availableDataStore,
      availableGroupStore: this.availableGroupStore,
      logger: this.logger,
    };

    const lastAvailableData = await this.availableDataStore.search({
      attesterName,
      network,
      isOnChain: sendOnChain == true,
      latest: true,
    });
    const currentIdentifier =
      lastAvailableData.length > 0 ? lastAvailableData[0].identifier : "";

    const newIdentifier = await attester.makeGroupsAvailable(
      this.fetchGroups(attester),
      context
    );

    const diff = await attester.getGroupsAvailableDiff(
      currentIdentifier,
      newIdentifier,
      context
    );
    this.logger.info(diff);

    const availableData: AvailableData = {
      attesterName: attester.name,
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
        availableData.transactionHash = await attester.sendOnChain(
          newIdentifier,
          context
        );
        await this.availableDataStore.save(availableData);
      } else {
        this.logger.info(
          `Attester ${attesterName} Network ${network} Identifier ${newIdentifier} already on chain`
        );
        return availableData;
      }
    } else {
      await this.availableDataStore.save(availableData);
    }

    if (sendOnChain) {
      await attester.removeOnChain(newIdentifier, context);
    }

    return availableData;
  }

  public getAttester(attesterName: string, network: Network): Attester {
    const attester = this.attesters[attesterName];
    if (!attester) {
      throw new Error(`Attester "${attesterName}" does not exists`);
    }
    if (!attester.networks.includes(network)) {
      throw new Error(`Network "${network}" not supported by this attester`);
    }
    return attester;
  }

  public async *fetchGroups(
    attester: Attester
  ): AsyncGenerator<GroupWithInternalCollectionId> {
    for (const attestationCollection of attester.attestationsCollections) {
      for (const group of await attestationCollection.groupFetcher(
        this.groupStore
      )) {
        yield {
          internalCollectionId: attestationCollection.internalCollectionId,
          group: group,
        };
      }
    }
  }
}
