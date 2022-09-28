import { FetchedData, GroupStore, GroupWithData } from "topics/group";
import { GroupGeneratorStore } from "topics/group-generator";

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
  groupGeneratorStore: GroupGeneratorStore;
};

export type GenerateGroupOptions = {
  timestamp?: number;
  blockNumber?: number;
  additionalData?: FetchedData;
  firstGenerationOnly?: boolean;
};

export type GenerateAllGroupsOptions = GenerateGroupOptions & {
  frequency?: string;
};
