import { attesters } from "@attesters/index";
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
import { GroupStore } from "topics/group";
import { GroupGeneratorsLibrary } from "topics/group-generator";
import { groupGenerators as testGroupGenerators } from "topics/group-generator/test-group-generator";

export type CommonConfiguration = {
  attesters: AttestersLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStoreApi;
  groupStore: GroupStore;
  groupGenerators: GroupGeneratorsLibrary;
};

export enum ConfigurationDefault {
  Local,
  Test,
}

export const createConfiguration = (
  type: ConfigurationDefault,
  configuration: Partial<CommonConfiguration>
): CommonConfiguration => ({
  ...defaultConfigurations[type],
  ...configuration,
});

const defaultConfigurations: {
  [name in ConfigurationDefault]: CommonConfiguration;
} = {
  [ConfigurationDefault.Local]: {
    attesters: attesters,
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupGenerators: groupGenerators,
    groupStore: new LocalGroupStore(),
  },
  [ConfigurationDefault.Test]: {
    attesters: testAttesters,
    availableDataStore: new MemoryAvailableDataStore(),
    availableGroupStore: new MemoryFileStore(""),
    groupGenerators: testGroupGenerators,
    groupStore: new MemoryGroupStore(),
  },
};
