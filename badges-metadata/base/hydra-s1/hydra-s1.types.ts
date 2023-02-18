import { ChunkMetadataType } from "helpers";

export type HydraS1AvailableGroupProperties = {
  internalCollectionId: number;
  generationTimestamp?: number;
  isScore?: boolean;
  cooldownDuration?: number;
};

export type AccountTree = {
  root: string;
  chunk: ChunkMetadataType;
  groupId: string; // deprecated for accountsTreeValue -> to be removed
  accountsTreeValue: string;
  groupProperties: any;
  metadata: {
    leavesCount: number;
    groupId: string;
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
