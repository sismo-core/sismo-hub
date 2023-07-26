import { groupGeneratorsRoutesSchemas } from "./group-generator.api.schema";
import { Api } from "api";

const routes = async (api: Api) => {
  api.get("/group-generators", { schema: groupGeneratorsRoutesSchemas.list }, async () => ({
    items: Object.entries(api.groupGenerators.generators).map(([name, generator]) => ({
      name,
      generationFrequency: generator.generationFrequency,
    })),
  }));

  api.get(
    "/group-generators/:generatorName",
    { schema: groupGeneratorsRoutesSchemas.get },
    async (req) => ({
      items: (
        await api.groupGeneratorStore.search({
          generatorName: req.params.generatorName,
          latest: req.query.latest,
        })
      ).map((groupGenerator) => {
        const lastGenerationDuration =
          groupGenerator.lastGenerationDuration !== undefined
            ? { lastGenerationDuration: groupGenerator.lastGenerationDuration }
            : {};
        const generationFrequency =
          groupGenerator.generationFrequency ??
          api.groupGenerators.generators[groupGenerator.name]?.generationFrequency;
        return {
          name: groupGenerator.name,
          generationFrequency: generationFrequency,
          generationTimestamp: groupGenerator.timestamp,
          ...lastGenerationDuration,
        };
      }),
    })
  );
};

export default routes;
