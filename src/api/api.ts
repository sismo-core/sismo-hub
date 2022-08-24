import path from "path";
import FastifyStatic from "@fastify/static";
import FastifySwagger from "@fastify/swagger";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import Fastify from "fastify";
import { ApiConfiguration } from ".";
import { attesters } from "@attesters/index";
import { groupGenerators } from "@group-generators/generators";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { testAttesters } from "topics/attester/test-attester";
import availableDataRoutes from "topics/available-data/available-data.api";
import badgesRoutes from "topics/badge/badge.api";
import groupGeneratorsRoutes from "topics/group-generator/group-generator.api";
import { groupGenerators as testGroupGenerators } from "topics/group-generator/test-group-generator";
import groupsRoutes from "topics/group/group.api";

const removeTrailingSlash = (s: string) => s.replace(/\/+$/, "");

export class ApiService {
  configuration: ApiConfiguration;

  constructor(configuration: ApiConfiguration) {
    this.configuration = configuration;
  }

  public getApi() {
    const fastify = Fastify({
      logger: this.configuration.log,
      ignoreTrailingSlash: true,
    });
    fastify
      .withTypeProvider<JsonSchemaToTsProvider>()

      .decorate("attesters", this.configuration.attesters)
      .decorate("availableDataStore", this.configuration.availableDataStore)
      .decorate("availableGroupStore", this.configuration.availableGroupStore)
      .decorate("groupGenerators", this.configuration.groupGenerators)
      .decorate("groupStore", this.configuration.groupStore)
      .decorate(
        "staticUrl",
        (path: string) =>
          `${removeTrailingSlash(this.configuration.staticPrefix)}/${path}`
      )

      .register(FastifyStatic, {
        root: path.join(__dirname, "../../static"),
        prefix: "/static/",
      })
      .register(FastifySwagger, {
        routePrefix: "/doc",
        openapi: {
          info: {
            title: "Sismo Data Sources API",
            description: "Sismo Data Sources API - Swagger",
            version: "0.1.0",
          },
        },
        exposeRoute: true,
      })

      .register(availableDataRoutes)
      .register(badgesRoutes)
      .register(groupsRoutes)
      .register(groupGeneratorsRoutes)

      .register(this.configuration.availableGroupStore.registerRoutes())
      .register(this.configuration.groupStore.dataFileStore.registerRoutes());
    return fastify;
  }

  /* istanbul ignore next */
  public async start(port: number) {
    await this.getApi().listen({ port });
  }

  public async getOpenApiSchema() {
    const api = this.getApi();
    await api.ready();
    return api.swagger();
  }

  public static fromDefault(
    defaultConfiguration: ApiConfigurationDefault,
    configuration: Partial<ApiConfiguration> = {}
  ): ApiService {
    return new ApiService({
      ...defaultApiConfigurations[defaultConfiguration],
      ...configuration,
    });
  }
}

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
