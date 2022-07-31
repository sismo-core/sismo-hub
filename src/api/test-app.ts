import { FastifyInstance } from "fastify";
import { MemoryGroupStore } from "../infrastructure/group-store";
import { getFastify, Library } from "./app";

export const getTestFastify = (library?: Library): FastifyInstance => {
  return getFastify({
    log: false,
    library: library,
    groupStore: new MemoryGroupStore(),
  });
};
