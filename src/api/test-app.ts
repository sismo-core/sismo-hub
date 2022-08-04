import { FastifyInstance } from "fastify";
import { getFastify, Library } from "./app";
import { MemoryGroupStore } from "infrastructure/group-store";

export const getTestFastify = (library?: Library): FastifyInstance => {
  return getFastify({
    log: false,
    library: library,
    groupStore: new MemoryGroupStore(),
  });
};
