import { BigNumberish } from "ethers";
import { FileStore } from "file-store";
import { AvailableDataStore } from "topics/available-data";
import { BadgeMetadata } from "topics/badge";
import { Group, GroupStore } from "topics/group";

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
  groupFetcher: () => Promise<Group[]>;
  badge: BadgeMetadata;
};

export type GroupWithInternalCollectionId = {
  internalCollectionId: number;
  group: Group;
};

export type AttesterConstructorArgs = {
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
};

export type ComputeOptions = {
  sendOnChain?: boolean;
};
