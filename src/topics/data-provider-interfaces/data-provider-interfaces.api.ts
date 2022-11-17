import { dataProviderInterfacesRoutesSchemas } from "./data-provider-interfaces.schema";
import { Api } from "api";

const routes = async (api: Api) => {
  api.get(
    "/data-provider-interfaces",
    { schema: dataProviderInterfacesRoutesSchemas.list },
    async () => ({
      items: api.dataProviderInterfaces.getdataProviderInterfaces(),
    })
  );
};

export default routes;
