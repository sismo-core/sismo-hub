import { Network } from "./networks";
import { FileStore } from "file-store";
import { LoggerService } from "logger/logger";
import { AvailableDataStore } from "topics/available-data";
import { Group, GroupStore } from "topics/group";
import { GroupSnapshotStore } from "topics/group-snapshot";

export interface RegistryTreeBuilder {
  name: string;

  makeGroupsAvailable: () => Promise<string>;

  getGroupsAvailableDiff: (
    identifierA: string,
    identifierB: string
  ) => Promise<string>;

  sendOnChain: (identifier: string) => Promise<string>;

  removeOnChain: (identifierToKeep: string) => Promise<void>;
}

export type RegistryTreeNetworkConfiguration = {
  attesterAddress: string;
  rootsRegistryAddress: string;
};

export type RegistryTreeNetworksConfiguration = {
  [network in Network]?: RegistryTreeNetworkConfiguration;
};

export type RegistryTreeConfiguration = {
  networksConfiguration: RegistryTreeNetworksConfiguration;
  name: string;
  attestationsCollections?: AttestationsCollection[];
};

export type RegistryTreesConfigurationsLibrary = {
  [name: string]: RegistryTreeConfiguration;
};

export type AttesterComputeContext = {
  name: string;
  network: Network;
  generationTimestamp: number;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  logger: LoggerService;
};

export type NetworkConfiguration = {
  collectionIdFirst: number;
};

export type AttestationsCollection = {
  internalCollectionId: number;
  groupFetcher: (groupStore: GroupStore) => Promise<Group[]>;
  networks: Network[];
  additionalGroupProperties?: any;
};

export type AttesterConstructorArgs = {
  attesters: RegistryTreesConfigurationsLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  logger: LoggerService;
  networks: Network[];
};

export type ComputeOptions = {
  sendOnChain?: boolean;
  generationTimestamp?: number;
  dryRun?: boolean;
};
