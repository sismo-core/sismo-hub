import { FastifyInstance } from "fastify";
import { createFastify } from "./api";
import { groupGeneratorLibrary } from "@group-generators/generators";
import { ClassLibrary } from "helpers";
import { MemoryGroupStore } from "infrastructure/group-store";
import { GroupGenerator } from "topics/group-generator";

export const createTestFastify = (
  groupGenerators?: ClassLibrary<GroupGenerator>
): FastifyInstance => {
  return createFastify({
    log: false,
    groupGeneratorLibrary: groupGenerators ?? groupGeneratorLibrary,
    groupStore: new MemoryGroupStore(),
  });
};
