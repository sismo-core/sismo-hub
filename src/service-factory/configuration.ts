import {
  localAttesters,
  localBadges,
  stagingAttesters,
  stagingBadges,
  playgroundBadges,
  playgroundAttesters,
  prodAttesters,
  prodBadges,
} from "@attestations-collections/index";

import { flows, FlowType } from "@flows/index";
import { groupGenerators } from "@group-generators/generators";
import { dataProvidersFactorySchemas } from "@group-generators/helpers/data-providers";
import { FileStoreApi } from "file-store";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import {
  LocalGroupGeneratorStore,
  MemoryGroupGeneratorStore,
} from "infrastructure/group-generator-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import { StdoutLogger } from "infrastructure/logger/stdout-logger";
import { LoggerService } from "logger/logger";
import { AttestersLibrary } from "topics/attester";
import { testAttesters } from "topics/attester/test-attester";
import { AvailableDataStore } from "topics/available-data";
import { BadgesCollection } from "topics/badge";
import { testBadgesCollection } from "topics/badge/test-badge";
import { DataProvider } from "topics/data-providers/data-providers";
import { Flow } from "topics/flow";
import { testFlows } from "topics/flow/test-flows";
import { GroupStore } from "topics/group";
import {
  GroupGeneratorsLibrary,
  GroupGeneratorStore,
} from "topics/group-generator";
import { groupGenerators as testGroupGenerators } from "topics/group-generator/test-group-generator";
import { GlobalResolver } from "topics/resolver/global-resolver";

export type CommonConfiguration = {
  attesters: AttestersLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStoreApi;
  badgesCollections: BadgesCollection[];
  dataProviders: DataProvider[]; // TODO
  flows: Flow[];
  groupStore: GroupStore;
  groupGenerators: GroupGeneratorsLibrary;
  groupGeneratorStore: GroupGeneratorStore;
  globalResolver: GlobalResolver;
  logger: LoggerService;
};

export enum ConfigurationDefaultEnv {
  Prod = "prod",
  Playground = "playground",
  Staging = "staging",
  Dev = "dev",
  Local = "local",
  Test = "test",
}

export const createConfiguration = (
  type: ConfigurationDefaultEnv,
  configuration: Partial<CommonConfiguration>
): CommonConfiguration => ({
  ...defaultConfigurations[type],
  ...configuration,
});

const defaultConfigurations: {
  [name in ConfigurationDefaultEnv]: CommonConfiguration;
} = {
  [ConfigurationDefaultEnv.Prod]: {
    attesters: prodAttesters,
    badgesCollections: prodBadges,
    dataProviders: dataProvidersFactorySchemas,
    flows: flows[FlowType.Curated],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Playground]: {
    attesters: playgroundAttesters,
    badgesCollections: playgroundBadges,
    dataProviders: dataProvidersFactorySchemas,
    flows: flows[FlowType.Playground],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Staging]: {
    attesters: stagingAttesters,
    badgesCollections: stagingBadges,
    dataProviders: dataProvidersFactorySchemas,
    flows: flows[FlowType.Staging],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Dev]: {
    attesters: stagingAttesters,
    badgesCollections: stagingBadges,
    dataProviders: dataProvidersFactorySchemas,
    flows: flows[FlowType.Staging],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Local]: {
    attesters: localAttesters,
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    badgesCollections: localBadges,
    dataProviders: dataProvidersFactorySchemas,
    flows: flows[FlowType.Local],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    groupStore: new LocalGroupStore(),
    globalResolver: new GlobalResolver(),
    logger: new StdoutLogger(),
  },
  [ConfigurationDefaultEnv.Test]: {
    attesters: testAttesters,
    availableDataStore: new MemoryAvailableDataStore(),
    availableGroupStore: new MemoryFileStore(""),
    badgesCollections: [testBadgesCollection],
    dataProviders: dataProvidersFactorySchemas,
    flows: testFlows,
    groupGenerators: testGroupGenerators,
    groupGeneratorStore: new MemoryGroupGeneratorStore(),
    groupStore: new MemoryGroupStore(),
    globalResolver: new GlobalResolver(["^test:", "^0x[a-fA-F0-9]{40}$"]),
    logger: new MemoryLogger(),
  },
};
