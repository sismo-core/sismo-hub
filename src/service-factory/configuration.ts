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
import { dataProviderInterfacesSchemas } from "@group-generators/helpers/data-providers";
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
import { AttestersLibrary, Network } from "topics/attester";
import { testAttesters } from "topics/attester/test-attester";
import { AvailableDataStore } from "topics/available-data";
import { BadgesCollection } from "topics/badge";
import { testBadgesCollection } from "topics/badge/test-badge";
import { DataProviderInterface } from "topics/data-provider-interfaces/data-provider-interfaces";
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
  networks: Network[];
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStoreApi;
  badgesCollections: BadgesCollection[];
  dataProviderInterfaces: DataProviderInterface[];
  flows: Flow[];
  groupStore: GroupStore;
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
    networks: [Network.Polygon],
    badgesCollections: prodBadges,
    dataProviderInterfaces: dataProviderInterfacesSchemas,
    flows: flows[FlowType.Curated],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
    logger: new StdoutLogger(),
    globalResolver: new GlobalResolver(),
  },
  [ConfigurationDefaultEnv.Testnets]: {
    attesters: prodAttesters,
    networks: [Network.Goerli, Network.Mumbai],
    badgesCollections: prodBadges,
    dataProviderInterfaces: dataProviderInterfacesSchemas,
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
    networks: [Network.Polygon],
    badgesCollections: playgroundBadges,
    dataProviderInterfaces: dataProviderInterfacesSchemas,
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
    networks: [Network.Goerli, Network.Mumbai],
    badgesCollections: stagingBadges,
    dataProviderInterfaces: dataProviderInterfacesSchemas,
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
    networks: [Network.Goerli, Network.Mumbai],
    badgesCollections: stagingBadges,
    dataProviderInterfaces: dataProviderInterfacesSchemas,
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
    networks: [Network.Local],
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    badgesCollections: localBadges,
    dataProviderInterfaces: dataProviderInterfacesSchemas,
    flows: flows[FlowType.Local],
    groupGenerators: groupGenerators,
    groupGeneratorStore: new LocalGroupGeneratorStore(),
    groupStore: new LocalGroupStore(),
    globalResolver: new GlobalResolver(),
    logger: new StdoutLogger(),
  },
  [ConfigurationDefaultEnv.Test]: {
    attesters: testAttesters,
    networks: [Network.Test],
    availableDataStore: new MemoryAvailableDataStore(),
    availableGroupStore: new MemoryFileStore(""),
    badgesCollections: [testBadgesCollection],
    dataProviderInterfaces: dataProviderInterfacesSchemas,
    flows: testFlows,
    groupGenerators: testGroupGenerators,
    groupGeneratorStore: new MemoryGroupGeneratorStore(),
    groupStore: new MemoryGroupStore(),
    globalResolver: new GlobalResolver(["^test:", "^0x[a-fA-F0-9]{40}$"]),
    logger: new MemoryLogger(),
  },
};
