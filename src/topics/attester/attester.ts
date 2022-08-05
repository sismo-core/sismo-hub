import { BigNumberish } from "ethers";
import { AvailableGroupsMetadata, AvailableDataStore } from ".";
import FileStore from "file-store";
import { AttestationsCollection } from "topics/attestations-collection";
import { Group, GroupStore } from "topics/group";

export enum Network {
  Polygon = "polygon",
}

export type NetworkConfiguration = {
  address: string;
};

export type GroupWithInternalCollectionId = {
  internalCollectionId: number;
  group: Group;
};

export abstract class Attester {
  public abstract readonly name: string;
  public abstract readonly collectionIdFirst: BigNumberish;

  public abstract readonly networks: {
    [networkName in Network]?: NetworkConfiguration;
  };
  public abstract readonly attestationsCollections: AttestationsCollection[];

  protected groupStore: GroupStore;
  protected availableDataStore: AvailableDataStore;
  protected availableGroupStore: FileStore;

  constructor(
    groupStore: GroupStore,
    availableDataStore: AvailableDataStore,
    availableGroupStore: FileStore
  ) {
    this.groupStore = groupStore;
    this.availableDataStore = availableDataStore;
    this.availableGroupStore = availableGroupStore;
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
}
