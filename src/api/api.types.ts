import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FastifyInstance, FastifyLoggerInstance, RawServerBase, RawServerDefault } from "fastify";
import { RawReplyDefaultExpression, RawRequestDefaultExpression } from "fastify/types/utils";
import { FileStore, FileStoreApi } from "file-store";
import { LoggerService } from "logger/logger";
import { AvailableDataStore } from "topics/available-data";
import { BadgeService } from "topics/badge";
import { DataProviderService } from "topics/data-provider";
import { FlowService } from "topics/flow";
import { GroupStore } from "topics/group";
import { GroupGeneratorService, GroupGeneratorStore } from "topics/group-generator";
import { GroupSnapshotStore } from "topics/group-snapshot";
import { RegistryTreeService } from "topics/registry-tree";
import { GlobalResolver } from "topics/resolver/global-resolver";

declare module "fastify" {
  interface FastifyInstance {
    attesters: RegistryTreeService;
    availableDataStore: AvailableDataStore;
    availableGroupStore: FileStoreApi;
    badges: BadgeService;
    dataProviderInterfaces: DataProviderService;
    flows: FlowService;
    globalResolver: GlobalResolver;
    groupGenerators: GroupGeneratorService;
    groupStore: GroupStore;
    groupSnapshotStore: GroupSnapshotStore;
    groupGeneratorStore: GroupGeneratorStore;
    staticUrl: (path: string) => string;
    logger: LoggerService;
  }
}

export type Api<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  Logger extends FastifyLoggerInstance = FastifyLoggerInstance
> = FastifyInstance<RawServer, RawRequest, RawReply, Logger, JsonSchemaToTsProvider>;

export type ApiConstructorArgs = {
  attesterService: RegistryTreeService;
  badgeService: BadgeService;
  dataProviderInterfaceService: DataProviderService;
  flowService: FlowService;
  groupGeneratorService: GroupGeneratorService;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  globalResolver: GlobalResolver;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  groupGeneratorStore: GroupGeneratorStore;
  logger: LoggerService;
  log?: boolean;
  staticPrefix?: string;
};
