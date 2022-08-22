import { ChunkMetadataType } from "helpers";
import { NetworkConfiguration } from "topics/attester";

export type HydraS1NetworkConfiguration = NetworkConfiguration & {
  attesterAddress: string;
  rootsRegistryAddress: string;
};

export type HydraS1AvailableGroupProperties = {
  internalCollectionId: number;
  generationTimestamp: number;
  isScore: boolean;
};

export type AccountTree = {
  root: string;
  id: string;
  chunk: ChunkMetadataType;
  group: HydraS1AvailableGroupProperties;
  metadata: {
    leavesCount: number;
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
