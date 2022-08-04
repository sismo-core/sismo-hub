import Fastify from "fastify";
import groups from "topics/group/group.api";
import groupGenerators from "topics/group-generator/group-generator.api";
import { GroupGenerator } from "topics/group-generator";
import { GroupStore } from "topics/group";
import { LocalGroupStore } from "infrastructure/group-store";
import { generators } from "@group-generators/generators";

declare module "fastify" {
  interface FastifyInstance {
    groupGenerators: { [name: string]: GroupGenerator };
    groupStore: GroupStore;
  }
}

export type Library = {
  groupGenerators?: { [name: string]: GroupGenerator };
};

export type FastifyArguments = {
  log: boolean;
  library?: Library;
  groupStore?: GroupStore;
};

export const getFastify = ({ log, library, groupStore }: FastifyArguments) => {
  const fastify = Fastify({
    logger: log,
  });
  fastify.decorate("groupGenerators", library?.groupGenerators ?? generators);
  fastify.decorate("groupStore", groupStore ?? new LocalGroupStore());
  fastify.register(groups);
  fastify.register(groupGenerators);
  return fastify;
};
