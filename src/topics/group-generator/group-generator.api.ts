import { FastifyInstance } from "fastify";
import { GroupGenerator, GenerationFrequency } from "./group-generator";

type GroupGeneratorAPIType = {
  name: string;
  generationFrequency: GenerationFrequency;
};

const serialize = (
  name: string,
  groupGenerator: GroupGenerator
): GroupGeneratorAPIType => ({
  name: name,
  generationFrequency: groupGenerator.generationFrequency,
});

const routes = async (fastify: FastifyInstance) => {
  fastify.get("/group-generators", async () => {
    const groupGenerators = fastify.groupGenerators.all();
    const items: GroupGeneratorAPIType[] = [];
    for (const groupName in groupGenerators) {
      items.push(serialize(groupName, groupGenerators[groupName]));
    }
    return {
      items: items,
    };
  });
};

export default routes;
