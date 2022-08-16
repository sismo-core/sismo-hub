import { groupRoutesSchemas } from "./group-generator.api.schema";
import { Api } from "api";

const routes = async (api: Api) => {
  api.get("/group-generators", { schema: groupRoutesSchemas }, async () =>
    Object.entries(api.groupGenerators.all()).map(([name, generator]) => ({
      name,
      generationFrequency: generator.generationFrequency,
    }))
  );
};

export default routes;
