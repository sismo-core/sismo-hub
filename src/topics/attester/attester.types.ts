import { BigNumberish } from "ethers";
import { FileStore } from "file-store";
import { AvailableDataStore } from "topics/available-data";
import { BadgeMetadata } from "topics/badge";
import { Group, GroupStore } from "topics/group";

export type Attester<T extends NetworkConfiguration = NetworkConfiguration> = {
  name: string;
  networks: {
    [networkName in Network]?: T;
  };
  attestationsCollections: AttestationsCollection[];

  makeGroupsAvailable: (
    groups: AsyncGenerator<GroupWithInternalCollectionId>,
    computeContext: AttesterComputeContext<T>
  ) => Promise<string>;
  sendOnChain: (
    identifier: string,
    computeContext: AttesterComputeContext<T>
  ) => Promise<string>;
};

export type AttestersLibrary = {
  [name: string]: Attester;
};

export type AttesterComputeContext<
  T extends NetworkConfiguration = NetworkConfiguration
> = {
  name: string;
  network: Network;
  networkConfiguration: T;
  generationTimestamp: number;
  groupStore: GroupStore;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
};

export enum Network {
  Test = "test",
  Local = "local",
  Mainnet = "mainnet",
  Polygon = "polygon",
}

export type NetworkConfiguration = {
  collectionIdFirst: BigNumberish;
};

export type AttestationsCollection = {
  internalCollectionId: number;
  groupFetcher: (groupStore: GroupStore) => Promise<Group[]>;
  badge: BadgeMetadata;
};

export type GroupWithInternalCollectionId = {
  internalCollectionId: number;
  group: Group;
};

export type AttesterConstructorArgs = {
  attesters: AttestersLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
};

export type ComputeOptions = {
  sendOnChain?: boolean;
};
