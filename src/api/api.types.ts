import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import {
  FastifyInstance,
  FastifyLoggerInstance,
  RawServerBase,
  RawServerDefault,
} from "fastify";
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
} from "fastify/types/utils";
import { FileStore, FileStoreApi } from "file-store";
import { AttesterService } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { BadgeService } from "topics/badge";
import { GroupStore } from "topics/group";
import { GroupGeneratorService } from "topics/group-generator";

declare module "fastify" {
  interface FastifyInstance {
    attesters: AttesterService;
    availableDataStore: AvailableDataStore;
    availableGroupStore: FileStoreApi;
    badges: BadgeService;
    groupGenerators: GroupGeneratorService;
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

export type ApiConstructorArgs = {
  attesterService: AttesterService;
  badgeService: BadgeService;
  groupGeneratorService: GroupGeneratorService;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
  log?: boolean;
  staticPrefix?: string;
};
