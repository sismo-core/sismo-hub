import { BigNumberish } from "ethers";
import FileStore from "../../file-store";
import { AttestationsCollection } from "../attestations-collection";
import { GroupStore } from "../group";
import {
  AvailableGroupsMetadata,
  GroupWithInternalCollectionIdType,
} from "./attester.types";
import { AvailableDataStore } from "./available-data-store";

export class Attester {
  public name: string;
  public attestationsCollections: AttestationsCollection[];
  public collectionIdFirst: BigNumberish;

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

  public sendOnChain(): void {
    throw Error("sendOnChain method must be implemented!");
  }

  protected async makeGroupsAvailable(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    generationTimestamp: number
  ): Promise<AvailableGroupsMetadata> {
    throw Error("makeGroupsAvailable method must be implemented!");
  }

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
