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
import { AvailableDataStore } from "topics/available-data";
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
    { sendOnChain }: ComputeOptions = {}
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
      generationTimestamp: Math.floor(Date.now() / 1000),
      groupStore: this.groupStore,
      availableDataStore: this.availableDataStore,
      availableGroupStore: this.availableGroupStore,
      logger: this.logger,
    };

    const identifier = await attester.makeGroupsAvailable(
      this.fetchGroups(attester),
      context
    );

    const availableData = {
      attesterName: attester.name,
      timestamp: context.generationTimestamp,
      network,
      identifier,
      isOnChain: sendOnChain == true,
    };

    // root already onchain, don't need to send and update
    if (await attester.isOnChain(identifier, context)) {
      this.logger.info(
        `Root ${identifier} already on-chain for attester ${attesterName} on network ${network}. Skipping`
      );
      return availableData;
    }

    const transactionHash = sendOnChain
      ? await attester.sendOnChain(identifier, context)
      : undefined;

    const availableDataWithTransactionHash = {
      ...availableData,
      transactionHash,
    };

    await this.availableDataStore.save(availableDataWithTransactionHash);

    return availableDataWithTransactionHash;
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
