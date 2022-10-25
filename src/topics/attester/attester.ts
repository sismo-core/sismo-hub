import {
  Attester,
  AttesterComputeContext,
  AttesterConstructorArgs,
  AttestersLibrary,
  ComputeOptions,
  GroupWithProperties,
  Network,
} from ".";
import { FileStore } from "file-store";
import { LoggerService } from "logger/logger";
import { AvailableDataStore, AvailableData } from "topics/available-data";
import { GroupStore } from "topics/group";
import { GroupPropertiesEncoderFn } from "topics/group-properties-encoder";

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

    this.logger.info(`Sending groups on ${network} chain`);

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
      this.fetchGroups(attester, attester.groupPropertiesEncoder),
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
          `Attester ${attesterName} on ${network} root already on chain (${newIdentifier})`
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
    const attesterNetwork = this.attesters[network];
    if (!attesterNetwork) {
      throw new Error(
        "Network not referenced or does not exists for the attester"
      );
    }
    const attester = attesterNetwork[attesterName];
    if (!attester) {
      throw new Error(`Attester "${attesterName}" does not exists`);
    }
    return attester;
  }

  public async *fetchGroups(
    attester: Attester,
    groupPropertiesEncoder: GroupPropertiesEncoderFn
  ): AsyncGenerator<GroupWithProperties> {
    for (const attestationsCollection of attester.attestationsCollections) {
      for (const group of await attestationsCollection.groupFetcher(
        this.groupStore
      )) {
        yield {
          internalCollectionId: attestationsCollection.internalCollectionId,
          group,
          groupPropertiesEncoder: groupPropertiesEncoder(
            attestationsCollection,
            group
          ),
        };
      }
    }
  }
}
