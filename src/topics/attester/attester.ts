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
    { sendOnChain, generationTimestamp }: ComputeOptions = {}
  ) {
    const attester = this.attesters[attesterName];
    if (!attester) {
      throw new Error(`Attester "${attesterName}" does not exists`);
    }
    if (!attester.networks.includes(network)) {
      throw new Error(`Network "${network}" not supported by this attester`);
    }

    const context: AttesterComputeContext = {
      name: attesterName,
      network,
      generationTimestamp: generationTimestamp ?? Math.floor(Date.now() / 1000),
      groupStore: this.groupStore,
      availableDataStore: this.availableDataStore,
      availableGroupStore: this.availableGroupStore,
      logger: this.logger,
    };

    const identifier = await attester.makeGroupsAvailable(
      this.fetchGroups(attester),
      context
    );

    const availableData: AvailableData = {
      attesterName: attester.name,
      timestamp: context.generationTimestamp,
      network,
      identifier,
      isOnChain: sendOnChain == true,
    };

    if (sendOnChain) {
      const lastAvailableDataStored = await this.availableDataStore.search({
        attesterName,
        network,
        isOnChain: true,
        latest: true,
      });
      const isIdentifierSaved = lastAvailableDataStored.find(
        (ad) => ad.identifier === identifier
      );
      if (!isIdentifierSaved) {
        availableData.transactionHash = await attester.sendOnChain(
          identifier,
          context
        );
        await this.availableDataStore.save(availableData);
      } else {
        this.logger.info(
          `Attester ${attesterName} Network ${network} Identifier ${identifier} already on chain`
        );
        return availableData;
      }
    } else {
      await this.availableDataStore.save(availableData);
    }

    if (sendOnChain) {
      await attester.removeOnChain(identifier, context);
    }

    return availableData;
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
