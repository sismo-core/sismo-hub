import Fastify from "fastify";
import { ClassLibrary } from "helpers";
import { Attester } from "topics/attester";
import { GroupStore } from "topics/group";
import { GroupGenerator } from "topics/group-generator";
import groupGenerators from "topics/group-generator/group-generator.api";
import groups from "topics/group/group.api";

declare module "fastify" {
  interface FastifyInstance {
    attesters: ClassLibrary<Attester>;
    groupGenerators: ClassLibrary<GroupGenerator>;
    groupStore: GroupStore;
  }
}

export type FastifyArguments = {
  log: boolean;
  attesterLibrary: ClassLibrary<Attester>;
  groupStore: GroupStore;
  groupGeneratorLibrary: ClassLibrary<GroupGenerator>;
};

export const createFastify = ({
  log,
  attesterLibrary,
  groupGeneratorLibrary,
  groupStore,
}: FastifyArguments) => {
  const fastify = Fastify({
    logger: log,
  });
  fastify.decorate("attesters", attesterLibrary);
  fastify.decorate("groupGenerators", groupGeneratorLibrary);
  fastify.decorate("groupStore", groupStore);
  fastify.register(groups);
  fastify.register(groupGenerators);
  return fastify;
};
