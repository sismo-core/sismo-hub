import { createApi, ApiConfiguration } from "./api";
import { attesters } from "@attesters/index";
import { groupGenerators } from "@group-generators/generators";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { testAttesters } from "topics/attester/test-attester";
import { groupGenerators as testGroupGenerators } from "topics/group-generator/test-group-generator";

export enum ApiConfigurationDefault {
  Local,
  Test,
}

const defaultApiConfigurations: {
  [name in ApiConfigurationDefault]: ApiConfiguration;
} = {
  [ApiConfigurationDefault.Local]: {
    log: true,
    attesters: attesters,
    availableDataStore: new LocalAvailableDataStore(),
    availableGroupStore: new LocalFileStore("available-groups"),
    groupGenerators: groupGenerators,
    groupStore: new LocalGroupStore(),
    staticPrefix: "/static/",
  },
  [ApiConfigurationDefault.Test]: {
    log: false,
    attesters: testAttesters,
    availableDataStore: new MemoryAvailableDataStore(),
    availableGroupStore: new MemoryFileStore(""),
    groupGenerators: testGroupGenerators,
    groupStore: new MemoryGroupStore(),
    staticPrefix: "/static/",
  },
};

export const createApiWithDefaults = (
  defaultConfiguration: ApiConfigurationDefault,
  configuration: Partial<ApiConfiguration> = {}
) =>
  createApi({
    ...defaultApiConfigurations[defaultConfiguration],
    ...configuration,
  });
