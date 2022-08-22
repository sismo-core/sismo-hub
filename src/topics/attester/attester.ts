import { BigNumber, BigNumberish, ethers } from "ethers";
import {
  AttestationsCollection,
  AttesterConstructorArgs,
  ComputeOptions,
  GroupWithInternalCollectionId,
  Network,
  NetworkConfiguration,
} from "./attester.types";
import { FileStore } from "file-store";
import { AvailableData, AvailableDataStore } from "topics/available-data";
import { Badge } from "topics/badge";
import { GroupStore } from "topics/group";

export abstract class Attester<
  T extends NetworkConfiguration = NetworkConfiguration
> {
  public abstract readonly name: string;
  public abstract readonly networks: {
    [networkName in Network]?: T;
  };
  public abstract readonly attestationsCollections: AttestationsCollection[];

  protected groupStore: GroupStore;
  protected availableDataStore: AvailableDataStore;
  protected availableGroupStore: FileStore;

  constructor({
    availableDataStore,
    availableGroupStore,
    groupStore,
  }: AttesterConstructorArgs) {
    this.availableDataStore = availableDataStore;
    this.availableGroupStore = availableGroupStore;
    this.groupStore = groupStore;
  }

  protected abstract makeGroupsAvailable(
    generationTimestamp: number
  ): Promise<string>;

  protected abstract sendOnChain(
    network: Network,
    networkConfiguration: NetworkConfiguration,
    identifier: string
  ): Promise<string>;

  public async compute(
    network: Network,
    { sendOnChain }: ComputeOptions = {}
  ): Promise<AvailableData> {
    const networkConfiguration = this.networks[network];
    if (!networkConfiguration) {
      throw new Error("Network not supported");
    }

    const generationTimestamp: number = Math.floor(Date.now() / 1000);
    const identifier = await this.makeGroupsAvailable(generationTimestamp);

    const transactionHash = sendOnChain
      ? await this.sendOnChain(network, networkConfiguration, identifier)
      : undefined;

    const availableData = {
      attesterName: this.name,
      timestamp: generationTimestamp,
      network,
      identifier,
      transactionHash,
      isOnChain: sendOnChain == true,
    };
    await this.availableDataStore.save(availableData);
    return availableData;
  }

  public async *fetchGroups(): AsyncGenerator<GroupWithInternalCollectionId> {
    for (const attestationCollection of this.attestationsCollections) {
      for (const group of await attestationCollection.groupFetcher()) {
        yield {
          internalCollectionId: attestationCollection.internalCollectionId,
          group: group,
        };
      }
    }
  }

  getBadges(network: Network): Badge[] {
    const networkConfiguration = this.networks[network];
    if (networkConfiguration === undefined) {
      return [];
    }
    return this.attestationsCollections.map((collection) => ({
      ...collection.badge,
      collectionId: computeCollectionId(
        networkConfiguration.collectionIdFirst,
        collection.internalCollectionId
      ),
      network: network,
    }));
  }
}

const computeCollectionId = (
  collectionIdFirst: BigNumberish,
  internalCollectionId: number
): string => {
  const collectionId =
    BigNumber.from(internalCollectionId).add(collectionIdFirst);
  return ethers.utils.hexZeroPad(collectionId.toHexString(), 32).slice(2);
};
