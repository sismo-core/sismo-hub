import { Network } from "./networks";
import { FileStore } from "file-store";
import { LoggerService } from "logger/logger";
import { AvailableDataStore } from "topics/available-data";
import { Group, GroupStore } from "topics/group";
import {
  GroupPropertiesEncoder,
  GroupPropertiesEncoderFn,
} from "topics/group-properties-encoder";

export type Attester = {
  name: string;
  groupPropertiesEncoder: GroupPropertiesEncoderFn;
  attestationsCollections: AttestationsCollection[];

  makeGroupsAvailable: (
    groups: AsyncGenerator<GroupWithProperties>,
    computeContext: AttesterComputeContext
  ) => Promise<string>;

  getGroupsAvailableDiff: (
    identifierA: string,
    identifierB: string,
    computeContext: AttesterComputeContext
  ) => Promise<string>;

  sendOnChain: (
    identifier: string,
    computeContext: AttesterComputeContext,
    network: Network
  ) => Promise<string>;

  removeOnChain: (
    identifierToKeep: string,
    computeContext: AttesterComputeContext,
    network: Network
  ) => Promise<void>;
};

export type AttestersLibrary = {
  [name: string]: Attester;
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

export type GroupPropertiesGenerator = (
  group: Group,
  attestationsCollection: AttestationsCollection
) => { properties: any; groupId: string };

export type NetworkConfiguration = {
  collectionIdFirst: number;
};

export type AttestationsCollection = {
  internalCollectionId: number;
  groupFetcher: (groupStore: GroupStore) => Promise<Group[]>;
  networks: Network[];
  additionalGroupProperties?: any;
};

export type GroupWithProperties = {
  group: Group;
  internalCollectionId: number;
  groupPropertiesEncoder: GroupPropertiesEncoder;
};

export type AttesterConstructorArgs = {
  attesters: AttestersLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
  logger: LoggerService;
  networks: Network[];
};

export type ComputeOptions = {
  sendOnChain?: boolean;
  generationTimestamp?: number;
  dryRun?: boolean;
};
