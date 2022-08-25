import path from "path";
import FastifyStatic from "@fastify/static";
import FastifySwagger from "@fastify/swagger";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import Fastify from "fastify";
import { ApiConstructorArgs } from ".";
import { FileStore } from "file-store";
import { AttesterService } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import availableDataRoutes from "topics/available-data/available-data.api";
import { BadgeService } from "topics/badge";
import badgesRoutes from "topics/badge/badge.api";
import { FlowService } from "topics/flow";
import flowsRoutes from "topics/flow/flow.api";
import { GroupStore } from "topics/group";
import { GroupGeneratorService } from "topics/group-generator";
import groupGeneratorsRoutes from "topics/group-generator/group-generator.api";
import groupsRoutes from "topics/group/group.api";

const removeTrailingSlash = (s: string) => s.replace(/\/+$/, "");

export class ApiService {
  attesterService: AttesterService;
  badgeService: BadgeService;
  flowService: FlowService;
  groupGeneratorService: GroupGeneratorService;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
  log: boolean;
  staticPrefix: string;

  constructor(configuration: ApiConstructorArgs) {
    this.attesterService = configuration.attesterService;
    this.badgeService = configuration.badgeService;
    this.flowService = configuration.flowService;
    this.groupGeneratorService = configuration.groupGeneratorService;
    this.availableDataStore = configuration.availableDataStore;
    this.availableGroupStore = configuration.availableGroupStore;
    this.groupStore = configuration.groupStore;

    this.log = configuration.log !== undefined ? configuration.log : true;
    this.staticPrefix = configuration.staticPrefix ?? "/static";
  }

  public getApi() {
    const fastify = Fastify({
      logger: this.log,
      ignoreTrailingSlash: true,
    });
    fastify
      .withTypeProvider<JsonSchemaToTsProvider>()

      .decorate("attesters", this.attesterService)
      .decorate("badges", this.badgeService)
      .decorate("flows", this.flowService)
      .decorate("groupGenerators", this.groupGeneratorService)

      .decorate("availableDataStore", this.availableDataStore)
      .decorate("availableGroupStore", this.availableGroupStore)
      .decorate("groupStore", this.groupStore)

      .decorate(
        "staticUrl",
        (path: string) => `${removeTrailingSlash(this.staticPrefix)}/${path}`
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
      .register(flowsRoutes)
      .register(groupsRoutes)
      .register(groupGeneratorsRoutes)

      .register(this.availableGroupStore.registerRoutes())
      .register(this.groupStore.dataFileStore.registerRoutes());
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
}
