import { LoggerService } from "logger/logger";
import { FetchedData, GroupStore, GroupWithData } from "topics/group";
import { GroupGeneratorStore } from "topics/group-generator";
import { GroupSnapshotStore } from "topics/group-snapshot";
import { GlobalResolver } from "topics/resolver/global-resolver";

export enum GenerationFrequency {
  Once = "once",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

export type GenerationContext = {
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
  groupSnapshotStore: GroupSnapshotStore;
  groupGenerators: GroupGeneratorsLibrary;
  groupGeneratorStore: GroupGeneratorStore;
  globalResolver: GlobalResolver;
  logger: LoggerService;
};

export type GenerateGroupOptions = {
  timestamp?: number;
  additionalData?: FetchedData;
  lastGenerationTimeInterval?: number;
  firstGenerationOnly?: boolean;
};

export type GenerateAllGroupsOptions = GenerateGroupOptions & {
  frequency?: string;
};
