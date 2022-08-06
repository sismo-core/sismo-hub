import Fastify from "fastify";
import { ClassLibrary } from "helpers";
import { GroupStore } from "topics/group";
import { GroupGenerator } from "topics/group-generator";
import groupGenerators from "topics/group-generator/group-generator.api";
import groups from "topics/group/group.api";

declare module "fastify" {
  interface FastifyInstance {
    groupGenerators: ClassLibrary<GroupGenerator>;
    groupStore: GroupStore;
  }
}

export type FastifyArguments = {
  log: boolean;
  groupStore: GroupStore;
  groupGeneratorLibrary: ClassLibrary<GroupGenerator>;
};

export const createFastify = ({
  log,
  groupGeneratorLibrary,
  groupStore,
}: FastifyArguments) => {
  const fastify = Fastify({
    logger: log,
  });
  fastify.decorate("groupGenerators", groupGeneratorLibrary);
  fastify.decorate("groupStore", groupStore);
  fastify.register(groups);
  fastify.register(groupGenerators);
  return fastify;
};
