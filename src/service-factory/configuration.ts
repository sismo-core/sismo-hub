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
import { FileStoreApi } from "file-store";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { AttestersLibrary } from "topics/attester";
import { testAttesters } from "topics/attester/test-attester";
import { AvailableDataStore } from "topics/available-data";
import { BadgesCollection } from "topics/badge";
import { testBadgesCollection } from "topics/badge/test-badge";
import { Flow } from "topics/flow";
import { testFlows } from "topics/flow/test-flows";
import { GroupStore } from "topics/group";
import { GroupGeneratorsLibrary } from "topics/group-generator";
import { groupGenerators as testGroupGenerators } from "topics/group-generator/test-group-generator";

export type CommonConfiguration = {
  attesters: AttestersLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStoreApi;
  badgesCollections: BadgesCollection[];
  flows: Flow[];
  groupStore: GroupStore;
  groupGenerators: GroupGeneratorsLibrary;
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
    flows: flows[FlowType.Polygon],
    groupGenerators: groupGenerators,
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
  },
  [ConfigurationDefaultEnv.Playground]: {
    attesters: playgroundAttesters,
    badgesCollections: playgroundBadges,
    flows: flows[FlowType.PolygonPlayground],
    groupGenerators: groupGenerators,
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
  },
  [ConfigurationDefaultEnv.Staging]: {
    attesters: stagingAttesters,
    badgesCollections: stagingBadges,
    flows: flows[FlowType.Rinkeby],
    groupGenerators: groupGenerators,
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
  },
  [ConfigurationDefaultEnv.Dev]: {
    attesters: stagingAttesters,
    badgesCollections: stagingBadges,
    flows: flows[FlowType.Rinkeby],
    groupGenerators: groupGenerators,
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupStore: new MemoryGroupStore(),
  },
  [ConfigurationDefaultEnv.Local]: {
    attesters: localAttesters,
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    badgesCollections: localBadges,
    flows: flows[FlowType.Local],
    groupGenerators: groupGenerators,
    groupStore: new LocalGroupStore(),
  },
  [ConfigurationDefaultEnv.Test]: {
    attesters: testAttesters,
    availableDataStore: new MemoryAvailableDataStore(),
    availableGroupStore: new MemoryFileStore(""),
    badgesCollections: [testBadgesCollection],
    flows: testFlows,
    groupGenerators: testGroupGenerators,
    groupStore: new MemoryGroupStore(),
  },
};
