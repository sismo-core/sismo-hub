import { Network } from "./networks";
import { FileStore } from "file-store";
import { LoggerService } from "logger/logger";
import { AvailableDataStore } from "topics/available-data";
import { Group, GroupStore } from "topics/group";

export type Attester = {
  name: string;
  network: Network;
  attestationsCollections: AttestationsCollection[];

  makeGroupsAvailable: (
    groups: AsyncGenerator<GroupWithInternalCollectionId>,
    computeContext: AttesterComputeContext
  ) => Promise<string>;

  getGroupsAvailableDiff: (
    identifierA: string,
    identifierB: string,
    computeContext: AttesterComputeContext
  ) => Promise<string>;

  sendOnChain: (
    identifier: string,
    computeContext: AttesterComputeContext
  ) => Promise<string>;

  removeOnChain: (
    identifierToKeep: string,
    computeContext: AttesterComputeContext
  ) => Promise<void>;
};

export type AttestersLibrary = {
  [network in Network]?: {
    [name: string]: Attester;
  };
};

export type AttesterComputeContext = {
  name: string;
  network: Network;
  generationTimestamp: number;
  groupStore: GroupStore;
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
  logger: LoggerService;
};

export type ComputeOptions = {
  sendOnChain?: boolean;
  generationTimestamp?: number;
  dryRun?: boolean;
};
