import { ChunkMetadataType } from "helpers";

export type HydraS1NetworkConfiguration = {
  attesterAddress: string;
  rootsRegistryAddress: string;
};

export type HydraS1AvailableGroupProperties = {
  internalCollectionId: number;
  generationTimestamp?: number;
  isScore?: boolean;
  cooldownDuration?: number;
};

export type AccountTree = {
  root: string;
  groupId: string;
  chunk: ChunkMetadataType;
  groupProperties: HydraS1AvailableGroupProperties;
  metadata: {
    leavesCount: number;
    groupName: string;
    groupGenerationTimestamp: number;
    groupDataUrl: string;
  };
  dataUrl: string;
  treeUrl: string;
};

export type TreesMetadata = {
  registryTree: {
    root: string;
    metadata: any;
    dataUrl: string;
    treeUrl: string;
  };
  accountTrees: AccountTree[];
};

export interface IRootsRegistry {
  register(root: string): Promise<string>;
  unregister(root: string): Promise<string>;
  isAvailable(root: string): Promise<boolean>;
}
