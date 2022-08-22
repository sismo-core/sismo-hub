import path from "path";
import FastifyStatic from "@fastify/static";
import FastifySwagger from "@fastify/swagger";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import Fastify, {
  FastifyInstance,
  RawServerBase,
  FastifyLoggerInstance,
  RawServerDefault,
} from "fastify";
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
} from "fastify/types/utils";
import { openapiConfiguration } from ".";
import { FileStoreApi } from "file-store";
import { ClassLibrary } from "helpers";
import { Attester } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import availableDataRoutes from "topics/available-data/available-data.api";
import badgesRoutes from "topics/badge/badge.api";
import { GroupStore } from "topics/group";
import { GroupGenerator } from "topics/group-generator";
import groupGeneratorsRoutes from "topics/group-generator/group-generator.api";
import groupsRoutes from "topics/group/group.api";

declare module "fastify" {
  interface FastifyInstance {
    attesters: ClassLibrary<Attester>;
    availableDataStore: AvailableDataStore;
    availableGroupStore: FileStoreApi;
    groupGenerators: ClassLibrary<GroupGenerator>;
    groupStore: GroupStore;
    staticUrl: (path: string) => string;
  }
}

export type Api<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  Logger extends FastifyLoggerInstance = FastifyLoggerInstance
> = FastifyInstance<
  RawServer,
  RawRequest,
  RawReply,
  Logger,
  JsonSchemaToTsProvider
>;

export type ApiArguments = {
  log: boolean;
  attesterLibrary: ClassLibrary<Attester>;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStoreApi;
  groupStore: GroupStore;
  groupGeneratorLibrary: ClassLibrary<GroupGenerator>;
  staticPrefix: string;
};

const removeTrailingSlash = (s: string) => s.replace(/\/+$/, "");

export const createApi = ({
  log,
  attesterLibrary,
  availableDataStore,
  availableGroupStore,
  groupGeneratorLibrary,
  groupStore,
  staticPrefix,
}: ApiArguments) => {
  const fastify = Fastify({ logger: log, ignoreTrailingSlash: true });
  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()

    .decorate("attesters", attesterLibrary)
    .decorate("availableDataStore", availableDataStore)
    .decorate("availableGroupStore", availableGroupStore)
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
    .register(FastifySwagger, openapiConfiguration)

    .register(availableDataRoutes)
    .register(badgesRoutes)
    .register(groupsRoutes)
    .register(groupGeneratorsRoutes)

    .register(availableGroupStore.registerRoutes())
    .register(groupStore.dataFileStore.registerRoutes());
  return fastify;
};
