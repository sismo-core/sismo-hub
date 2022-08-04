import { BigNumberish } from "ethers";
import {
  AvailableGroupsMetadata,
  GroupWithInternalCollectionIdType,
  AvailableDataStore,
} from ".";
import FileStore from "file-store";
import { AttestationsCollection } from "topics/attestations-collection";
import { GroupStore } from "topics/group";

export abstract class Attester {
  public abstract readonly name: string;
  public abstract readonly attestationsCollections: AttestationsCollection[];
  public abstract readonly collectionIdFirst: BigNumberish;

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

  public async *fetchGroups(): AsyncGenerator<GroupWithInternalCollectionIdType> {
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
