import Fastify from "fastify";

import groups from "../topics/group/group.api";
import groupGenerators from "../topics/group-generator/group-generator.api";
import { GroupGenerator } from "../topics/group-generator";
import { getGenerators } from "../../group-generators/generators";
import { InfrastructureServices, localInfrastructure } from "../infrastructure";

declare module "fastify" {
  interface FastifyInstance {
    groupGenerators: { [name: string]: GroupGenerator };
    services: InfrastructureServices;
  }
}

type Library = {
  groupGenerators?: { [name: string]: GroupGenerator };
};

export const getFastify = (
  log: boolean,
  library?: Library,
  infrastructure?: InfrastructureServices
) => {
  const fastify = Fastify({
    logger: log,
  });
  fastify.decorate(
    "groupGenerators",
    library?.groupGenerators ?? getGenerators()
  );
  fastify.decorate("services", infrastructure ?? localInfrastructure);
  fastify.register(groups);
  fastify.register(groupGenerators);
  return fastify;
};
