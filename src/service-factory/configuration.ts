import {
  localRegistryTreeConfigs,
  localBadges,
  stagingRegistryTreeConfigs,
  stagingBadges,
  prodRegistryTreeConfigs,
  prodBadges,
} from "@badges-metadata/index";

import { flows, FlowType } from "@flows/index";
import { groupGenerators } from "@group-generators/generators";
import { mainDataProviders } from "@group-generators/helpers/data-providers";
import { FileStoreApi } from "file-store";
import { LocalAvailableDataStore, MemoryAvailableDataStore } from "infrastructure/available-data";
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
import { AvailableDataStore } from "topics/available-data";
import { BadgesCollection } from "topics/badge";
import { testBadgesCollection } from "topics/badge/test-badge";
import { DataProviders } from "topics/data-provider/data-provider";
import { testDataProviders } from "topics/data-provider/test-data-providers";
import { Flow } from "topics/flow";
import { testFlows } from "topics/flow/test-flows";
import { GroupStore } from "topics/group";
import { GroupGeneratorsLibrary, GroupGeneratorStore } from "topics/group-generator";
import { groupGenerators as testGroupGenerators } from "topics/group-generator/test-group-generator";
import { GroupSnapshotStore } from "topics/group-snapshot";
import { RegistryTreesConfigurationsLibrary, Network } from "topics/registry-tree";
import { testRegistryTreeConfigs } from "topics/registry-tree/test-registry-tree";
import { GlobalResolver } from "topics/resolver/global-resolver";

export type CommonConfiguration = {
  registryTreeConfigurations: RegistryTreesConfigurationsLibrary;
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
    registryTreeConfigurations: prodRegistryTreeConfigs,
    envNetworks: [
      Network.Polygon,
      Network.Gnosis,
      Network.Optimism,
      Network.ArbitrumOne,
      Network.Base,
      Network.Mainnet,
      Network.Goerli,
      Network.Sepolia,
      Network.Mumbai,
      Network.OptimismGoerli,
      Network.ArbitrumGoerli,
      Network.BaseGoerli,
      Network.ScrollTestnet,
    ],
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
    registryTreeConfigurations: prodRegistryTreeConfigs,
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
  [ConfigurationDefaultEnv.Staging]: {
    registryTreeConfigurations: stagingRegistryTreeConfigs,
    envNetworks: [Network.Goerli, Network.Mumbai, Network.ScrollTestnet],
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
    registryTreeConfigurations: stagingRegistryTreeConfigs,
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
    registryTreeConfigurations: localRegistryTreeConfigs,
    envNetworks: [Network.Local, Network.ScrollTestnet],
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
    registryTreeConfigurations: testRegistryTreeConfigs,
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
