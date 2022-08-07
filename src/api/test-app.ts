import { FastifyInstance } from "fastify";
import { createFastify } from "./api";
import { ClassLibrary } from "helpers";
import { MemoryGroupStore } from "infrastructure/group-store";
import { Attester } from "topics/attester";
import { attesterLibrary as defaultAttesterLibrary } from "topics/attester/test-attester";
import { GroupGenerator } from "topics/group-generator";
import { groupGeneratorLibrary as defaultGroupGeneratorLibrary } from "topics/group-generator/test-group-generator";

export type TestFastifyArguments = {
  attesterLibrary?: ClassLibrary<Attester>;
  groupGeneratorLibrary?: ClassLibrary<GroupGenerator>;
};

export const createTestFastify = ({
  attesterLibrary,
  groupGeneratorLibrary,
}: TestFastifyArguments): FastifyInstance => {
  return createFastify({
    log: false,
    attesterLibrary: attesterLibrary ?? defaultAttesterLibrary,
    groupGeneratorLibrary:
      groupGeneratorLibrary ?? defaultGroupGeneratorLibrary,
    groupStore: new MemoryGroupStore(),
  });
};
