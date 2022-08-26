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
import { AvailableDataStore } from "topics/available-data";
import { GroupStore } from "topics/group";

export class AttesterService {
  attesters: AttestersLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;

  constructor({
    attesters,
    availableDataStore,
    availableGroupStore,
    groupStore,
  }: AttesterConstructorArgs) {
    this.attesters = attesters;
    this.availableDataStore = availableDataStore;
    this.availableGroupStore = availableGroupStore;
    this.groupStore = groupStore;
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
    };

    const identifier = await attester.makeGroupsAvailable(
      this.fetchGroups(attester),
      context
    );

    const transactionHash = sendOnChain
      ? await attester.sendOnChain(identifier, context)
      : undefined;

    const availableData = {
      attesterName: attester.name,
      timestamp: context.generationTimestamp,
      network,
      identifier,
      transactionHash,
      isOnChain: sendOnChain == true,
    };
    await this.availableDataStore.save(availableData);
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
