import { groupGeneratorsRoutesSchemas } from "./group-generator.api.schema";
import { Api } from "api";

const routes = async (api: Api) => {
  api.get(
    "/group-generators",
    { schema: groupGeneratorsRoutesSchemas.list },
    async () => ({
      items: Object.entries(api.groupGenerators.generators).map(
        ([name, generator]) => ({
          name,
          generationFrequency: generator.generationFrequency,
        })
      ),
    })
  );

  api.get(
    "/group-generators/:generatorName",
    { schema: groupGeneratorsRoutesSchemas.get },
    async (req) => ({
      items: (
        await api.groupGeneratorStore.search({
          generatorName: req.params.generatorName,
          latest: req.query.latest,
        })
      ).map((groupGenerator) => ({
        name: groupGenerator.name,
        generationFrequency:
          api.groupGenerators.generators[groupGenerator.name]
            .generationFrequency,
        generationTimestamp: groupGenerator.timestamp,
      })),
    })
  );
};

export default routes;
