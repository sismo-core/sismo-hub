import {
  localAttesters,
  localBadges,
  stagingAttesters,
  stagingBadges,
  playgroundBadges,
  playgroundAttesters,
  prodAttesters,
  prodBadges,
} from "@badges-metadata/index";

import { flows, FlowType } from "@flows/index";
import { groupGenerators } from "@group-generators/generators";
import { mainDataProviders } from "@group-generators/helpers/data-providers";
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
import { MemoryGroupSnapshotStore } from "infrastructure/group-snapshot/group-snapshot-memory";
import { LocalGroupSnapshotStore } from "infrastructure/group-snapshot/local-group-snapshot-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import { StdoutLogger } from "infrastructure/logger/stdout-logger";
import { LoggerService } from "logger/logger";
import { RegistryTreesConfigurationsLibrary, Network } from "topics/attester";
import { testAttesters } from "topics/attester/test-attester";
import { AvailableDataStore } from "topics/available-data";
import { BadgesCollection } from "topics/badge";
import { testBadgesCollection } from "topics/badge/test-badge";
import { DataProviders } from "topics/data-provider/data-provider";
import { testDataProviders } from "topics/data-provider/test-data-providers";
import { Flow } from "topics/flow";
import { testFlows } from "topics/flow/test-flows";
import { GroupStore } from "topics/group";
import {
  GroupGeneratorsLibrary,
  GroupGeneratorStore,
} from "topics/group-generator";
import { groupGenerators as testGroupGenerators } from "topics/group-generator/test-group-generator";
import { GroupSnapshotStore } from "topics/group-snapshot";
import { GlobalResolver } from "topics/resolver/global-resolver";

export type CommonConfiguration = {
  attesters: RegistryTreesConfigurationsLibrary;
  envNetworks: Network[];
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStoreApi;
  badgesCollections: BadgesCollection[];
  dataProviders: DataProviders;
  flows: Flow[];
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  groupGenerators: GroupGeneratorsLibrary;
  groupGeneratorStore: GroupGeneratorStore;
  globalResolver: GlobalResolver;
  logger: LoggerService;
};

export enum ConfigurationDefaultEnv {
  Prod = "prod",
  Testnets = "testnets",
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
    envNetworks: [Network.Polygon, Network.Gnosis, Network.Mainnet],
    badgesCollections: prodBadges,
    dataProviders: mainDataProviders,
    flows: flows[FlowType.Main],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    groupSnapshotStore: new MemoryGroupSnapshotStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Testnets]: {
    attesters: prodAttesters,
    envNetworks: [Network.Goerli, Network.Mumbai],
    badgesCollections: prodBadges,
    dataProviders: mainDataProviders,
    flows: flows[FlowType.Main],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    groupSnapshotStore: new MemoryGroupSnapshotStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Playground]: {
    attesters: playgroundAttesters,
    envNetworks: [Network.Polygon],
    badgesCollections: playgroundBadges,
    dataProviders: mainDataProviders,
    flows: flows[FlowType.Playground],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    groupSnapshotStore: new MemoryGroupSnapshotStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Staging]: {
    attesters: stagingAttesters,
    envNetworks: [Network.Goerli, Network.Mumbai],
    badgesCollections: stagingBadges,
    dataProviders: mainDataProviders,
    flows: flows[FlowType.Staging],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    groupSnapshotStore: new MemoryGroupSnapshotStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Dev]: {
    attesters: stagingAttesters,
    envNetworks: [Network.Goerli, Network.Mumbai],
    badgesCollections: stagingBadges,
    dataProviders: mainDataProviders,
    flows: flows[FlowType.Staging],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    groupSnapshotStore: new MemoryGroupSnapshotStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Local]: {
    attesters: localAttesters,
    envNetworks: [Network.Local],
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    badgesCollections: localBadges,
    dataProviders: mainDataProviders,
    flows: flows[FlowType.Local],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    groupStore: new LocalGroupStore(),
    groupSnapshotStore: new LocalGroupSnapshotStore(),
    globalResolver: new GlobalResolver(),
    logger: new StdoutLogger(),
  },
  [ConfigurationDefaultEnv.Test]: {
    attesters: testAttesters,
    envNetworks: [Network.Test],
    availableDataStore: new MemoryAvailableDataStore(),
    availableGroupStore: new MemoryFileStore(""),
    badgesCollections: [testBadgesCollection],
    dataProviders: testDataProviders,
    flows: testFlows,
    groupGenerators: testGroupGenerators,
    groupGeneratorStore: new MemoryGroupGeneratorStore(),
    groupStore: new MemoryGroupStore(),
    groupSnapshotStore: new MemoryGroupSnapshotStore(),
    globalResolver: new GlobalResolver(["^test:", "^0x[a-fA-F0-9]{40}$"]),
    logger: new MemoryLogger(),
  },
};
