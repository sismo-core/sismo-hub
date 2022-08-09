import { BigNumber, BigNumberish, ethers } from "ethers";
import { AvailableGroupsMetadata, AvailableDataStore } from ".";
import FileStore from "file-store";
import { AttestationsCollection } from "topics/attestations-collection";
import { Badge } from "topics/badge";
import { Group, GroupStore } from "topics/group";

export enum Network {
  Polygon = "polygon",
  Mainnet = "mainnet",
}

export type NetworkConfiguration = {
  address: string;
  collectionIdFirst: BigNumberish;
};

export type GroupWithInternalCollectionId = {
  internalCollectionId: number;
  group: Group;
};

export abstract class Attester {
  public abstract readonly name: string;
  public abstract readonly networks: {
    [networkName in Network]?: NetworkConfiguration;
  };
  public abstract readonly attestationsCollections: AttestationsCollection[];

  protected groupStore: GroupStore;
  protected availableDataStore: AvailableDataStore;
  protected availableGroupStore: FileStore;

  constructor(
    availableDataStore: AvailableDataStore,
    availableGroupStore: FileStore,
    groupStore: GroupStore
  ) {
    this.availableDataStore = availableDataStore;
    this.availableGroupStore = availableGroupStore;
    this.groupStore = groupStore;
  }

  protected abstract makeGroupsAvailable(
    generationTimestamp: number
  ): Promise<AvailableGroupsMetadata>;

  public async compute(): Promise<void> {
    const generationTimestamp: number = Math.floor(Date.now() / 1000);
    await this.availableDataStore.save({
      attesterName: this.name,
      timestamp: generationTimestamp,
      metadata: await this.makeGroupsAvailable(generationTimestamp),
    });
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
