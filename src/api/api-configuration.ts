import { FastifyInstance } from "fastify";
import { createFastify, FastifyArguments } from "./api";
import { attesterLibrary } from "@attesters/index";
import { groupGeneratorLibrary } from "@group-generators/generators";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { attesterLibrary as testAttesterLibrary } from "topics/attester/test-attester";
import { groupGeneratorLibrary as testGroupGeneratorLibrary } from "topics/group-generator/test-group-generator";

export enum ApiConfigurationDefault {
  Local,
  Test,
}

const defaultApiConfigurations: {
  [name in ApiConfigurationDefault]: FastifyArguments;
} = {
  [ApiConfigurationDefault.Local]: {
    log: true,
    attesterLibrary: attesterLibrary,
    groupGeneratorLibrary: groupGeneratorLibrary,
    groupStore: new LocalGroupStore(),
    staticPrefix: "/static/",
  },
  [ApiConfigurationDefault.Test]: {
    log: false,
    attesterLibrary: testAttesterLibrary,
    groupGeneratorLibrary: testGroupGeneratorLibrary,
    groupStore: new MemoryGroupStore(),
    staticPrefix: "/static/",
  },
};

export const createFastifyWithDefaults = (
  defaultConfiguration: ApiConfigurationDefault,
  configuration: Partial<FastifyArguments> = {}
): FastifyInstance =>
  createFastify({
    ...defaultApiConfigurations[defaultConfiguration],
    ...configuration,
  });
