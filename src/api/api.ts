import path from "path";
import cors from "@fastify/cors";
import FastifyStatic from "@fastify/static";
import FastifySwagger from "@fastify/swagger";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import Fastify, { FastifyInstance } from "fastify";
import { ApiConstructorArgs } from ".";
import { FileStore } from "file-store";
import { LoggerService } from "logger/logger";
import { AttesterService } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import availableDataRoutes from "topics/available-data/available-data.api";
import { BadgeService } from "topics/badge";
import badgesRoutes from "topics/badge/badge.api";
import { DataProviderService } from "topics/data-provider";
import dataProviderInterfacesRoutes from "topics/data-provider/data-provider.api";
import { FlowService } from "topics/flow";
import flowsRoutes from "topics/flow/flow.api";
import { GroupStore } from "topics/group";
import {
  GroupGeneratorService,
  GroupGeneratorStore,
} from "topics/group-generator";
import groupGeneratorsRoutes from "topics/group-generator/group-generator.api";
import { GroupSnapshotStore } from "topics/group-snapshot";
import groupSnapshotsRoutes from "topics/group-snapshot/group-snapshot.api";
import groupsRoutes from "topics/group/group.api";

const removeTrailingSlash = (s: string) => s.replace(/\/+$/, "");

const DEFAULT_STATIC_PREFIX = "/static";

export class ApiService {
  attesterService: AttesterService;
  badgeService: BadgeService;
  dataProviderInterfaceService: DataProviderService;
  flowService: FlowService;
  groupGeneratorService: GroupGeneratorService;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  groupGeneratorStore: GroupGeneratorStore;
  log: boolean;
  staticPrefix: string;
  logger: LoggerService;

  constructor(configuration: ApiConstructorArgs) {
    this.attesterService = configuration.attesterService;
    this.badgeService = configuration.badgeService;
    this.dataProviderInterfaceService =
      configuration.dataProviderInterfaceService;
    this.flowService = configuration.flowService;
    this.groupGeneratorService = configuration.groupGeneratorService;
    this.availableDataStore = configuration.availableDataStore;
    this.availableGroupStore = configuration.availableGroupStore;
    this.groupStore = configuration.groupStore;
    this.groupSnapshotStore = configuration.groupSnapshotStore;
    this.groupGeneratorStore = configuration.groupGeneratorStore;
    this.logger = configuration.logger;

    this.log = configuration.log !== undefined ? configuration.log : true;
    this.staticPrefix = configuration.staticPrefix ?? DEFAULT_STATIC_PREFIX;
  }

  public getApi() {
    const fastify = Fastify({
      logger: this.log,
      ignoreTrailingSlash: true,
    });
    fastify
      .withTypeProvider<JsonSchemaToTsProvider>()
      .register(cors, { origin: true })

      .decorate("attesters", this.attesterService)
      .decorate("badges", this.badgeService)
      .decorate("flows", this.flowService)
      .decorate("dataProviderInterfaces", this.dataProviderInterfaceService)
      .decorate("groupGenerators", this.groupGeneratorService)
      .decorate("groupGeneratorStore", this.groupGeneratorStore)

      .decorate("availableDataStore", this.availableDataStore)
      .decorate("availableGroupStore", this.availableGroupStore)
      .decorate("groupStore", this.groupStore)
      .decorate("groupSnapshotStore", this.groupSnapshotStore)
      .decorate("logger", this.logger)

      .decorate(
        "staticUrl",
        (path: string) => `${removeTrailingSlash(this.staticPrefix)}/${path}`
      )

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
      .register(flowsRoutes)
      .register(dataProviderInterfacesRoutes)
      .register(groupsRoutes)
      .register(groupSnapshotsRoutes)
      .register(groupGeneratorsRoutes)

      .register(this.availableGroupStore.registerRoutes())
      .register(this.groupStore.dataFileStore.registerRoutes())
      .register(this.groupSnapshotStore.dataFileStore.registerRoutes());

    if (this.staticPrefix == DEFAULT_STATIC_PREFIX) {
      fastify.register(FastifyStatic, {
        root: path.join(__dirname, "../../static"),
        prefix: `${DEFAULT_STATIC_PREFIX}/`,
      });
    }

    this._addRapidDocRedirect(fastify);
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

  private _addRapidDocRedirect(fastify: FastifyInstance) {
    fastify.get(
      "/rapidoc",
      { schema: { hide: true } },
      async (request, reply) => {
        reply.redirect(fastify.staticUrl("rapidoc/index.html"));
      }
    );
  }
}
