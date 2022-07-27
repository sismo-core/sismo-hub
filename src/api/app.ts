import Fastify from "fastify";
import { DependencyContainer } from "tsyringe";

import { getGenerators } from "../../group-generators/generators";
import { getLocalContainer, InfrastructureServices } from "../infrastructure";
import { GroupGenerator } from "../topics/group-generator";

import { attesterApiRoutes } from "../topics/attester/api";
import { badgeApiRoutes } from "../topics/badge/api";
import groupGenerators from "../topics/group-generator/group-generator.api";
import groups from "../topics/group/group.api";

declare module "fastify" {
  interface FastifyInstance {
    container: DependencyContainer;
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
  dependencyContainer?: DependencyContainer
) => {
  const fastify = Fastify({
    logger: log,
  });
  const container = dependencyContainer ?? getLocalContainer();
  fastify.decorate("container", container);
  fastify.decorate(
    "groupGenerators",
    library?.groupGenerators ?? getGenerators()
  );
  fastify.decorate("services", {
    groupStore: container.resolve("GroupStore"),
  });
  fastify.register(groups);
  fastify.register(groupGenerators);
  fastify.register(badgeApiRoutes);
  fastify.register(attesterApiRoutes);
  return fastify;
};
