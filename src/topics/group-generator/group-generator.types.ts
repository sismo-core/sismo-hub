import { FetchedData, GroupStore, GroupWithData } from "topics/group";

export enum GenerationFrequency {
  Once = "once",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

export type GenerationContext = {
  blockNumber: number;
  timestamp: number;
};

export type GroupGenerator = {
  generationFrequency: GenerationFrequency;
  dependsOn?: string[];
  generate: (
    context: GenerationContext,
    groupStore: GroupStore
  ) => Promise<GroupWithData[]>;
};

export type GroupGeneratorsLibrary = { [name: string]: GroupGenerator };

export type GroupGeneratorServiceConstructorArgs = {
  groupStore: GroupStore;
  groupGenerators: GroupGeneratorsLibrary;
};

export type GenerateGroupOptions = {
  timestamp?: number;
  blockNumber?: number;
  additionalData?: FetchedData;
};

export type GenerateAllGroupsOptions = {
  frequency?: string;
  timestamp?: number;
  blockNumber?: number;
  additionalData?: FetchedData;
};
