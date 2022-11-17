import { dataProvidersRoutesSchemas } from "./data-providers.schema";
import { Api } from "api";

const routes = async (api: Api) => {
  api.get(
    "/data-providers",
    { schema: dataProvidersRoutesSchemas.list },
    async () => ({
      items: api.dataProviders.getDataProviders(),
    })
  );
};

export default routes;
