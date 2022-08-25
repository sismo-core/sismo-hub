import { FetchedData, GroupStore, GroupWithData } from "topics/group";

export enum GenerationFrequency {
  Once = "Once",
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
}

export type GenerationContext = {
  blockNumber: number;
  timestamp: number;
};

export type GroupGenerator = {
  generationFrequency: GenerationFrequency;
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
