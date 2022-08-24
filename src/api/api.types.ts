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
import { CommonConfiguration } from "configuration";
import { FileStoreApi } from "file-store";
import { AttestersLibrary } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { GroupStore } from "topics/group";
import { GroupGeneratorsLibrary } from "topics/group-generator";

declare module "fastify" {
  interface FastifyInstance {
    attesters: AttestersLibrary;
    availableDataStore: AvailableDataStore;
    availableGroupStore: FileStoreApi;
    groupGenerators: GroupGeneratorsLibrary;
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

export type ApiConfiguration = Pick<
  CommonConfiguration,
  | "attesters"
  | "availableDataStore"
  | "availableGroupStore"
  | "groupStore"
  | "groupGenerators"
> & {
  log: boolean;
  staticPrefix: string;
};
