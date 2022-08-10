import path from "path";
import FastifyStatic from "@fastify/static";
import Fastify from "fastify";
import { ClassLibrary } from "helpers";
import { Attester } from "topics/attester";
import badgesRoutes from "topics/badge/badge.api";
import { GroupStore } from "topics/group";
import { GroupGenerator } from "topics/group-generator";
import groupGeneratorsRoutes from "topics/group-generator/group-generator.api";
import groupsRoutes from "topics/group/group.api";

declare module "fastify" {
  interface FastifyInstance {
    attesters: ClassLibrary<Attester>;
    groupGenerators: ClassLibrary<GroupGenerator>;
    groupStore: GroupStore;
    staticUrl: (path: string) => string;
  }
}

export type FastifyArguments = {
  log: boolean;
  attesterLibrary: ClassLibrary<Attester>;
  groupStore: GroupStore;
  groupGeneratorLibrary: ClassLibrary<GroupGenerator>;
  staticPrefix: string;
};

const removeTrailingSlash = (s: string) => s.replace(/\/+$/, "");

export const createFastify = ({
  log,
  attesterLibrary,
  groupGeneratorLibrary,
  groupStore,
  staticPrefix,
}: FastifyArguments) =>
  Fastify({ logger: log, ignoreTrailingSlash: true })
    .decorate("attesters", attesterLibrary)
    .decorate("groupGenerators", groupGeneratorLibrary)
    .decorate("groupStore", groupStore)
    .decorate(
      "staticUrl",
      (path: string) => `${removeTrailingSlash(staticPrefix)}/${path}`
    )
    .register(FastifyStatic, {
      root: path.join(__dirname, "../../static"),
      prefix: "/static/",
    })
    .register(groupStore.dataFileStore.registerRoutes())
    .register(badgesRoutes)
    .register(groupsRoutes)
    .register(groupGeneratorsRoutes);
