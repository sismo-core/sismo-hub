import { groupRoutesSchemas } from "./group-generator.api.schema";
import { Api } from "api";

const routes = async (api: Api) => {
  api.get("/group-generators", { schema: groupRoutesSchemas }, async () => ({
    items: Object.entries(api.groupGenerators).map(([name, generator]) => ({
      name,
      generationFrequency: generator.generationFrequency,
    })),
  }));
};

export default routes;
