import Fastify from "fastify";

import groups from "../topics/group/group.api";
import groupGenerators from "../topics/group-generator/group-generator.api";
import { GroupGenerator } from "../topics/group-generator";
import { getGenerators } from "../../group-generators/generators";

declare module "fastify" {
  interface FastifyInstance {
    groupGenerators: { [name: string]: GroupGenerator };
  }
}

type Library = {
  groupGenerators?: { [name: string]: GroupGenerator };
};

export const getFastify = (log: boolean, library: Library) => {
  const fastify = Fastify({
    logger: log,
  });
  fastify.decorate(
    "groupGenerators",
    library.groupGenerators ? library.groupGenerators : getGenerators()
  );
  fastify.register(groups);
  fastify.register(groupGenerators);
  return fastify;
};
