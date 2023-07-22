import { dataProviderInterfacesRoutesSchemas } from "./data-provider.schema";
import { Api } from "api";

const routes = async (api: Api) => {
  // TODO keep for retro-compat, to remove in the future
  api.get(
    "/data-provider-interfaces",
    { schema: dataProviderInterfacesRoutesSchemas.list },
    async () => ({
      items: api.dataProviderInterfaces.getDataProviderInterfaces(),
    })
  );

  api.get(
    "/data-provider/interfaces",
    { schema: dataProviderInterfacesRoutesSchemas.list },
    async () => {
      const dataPovidersInterfaces = api.dataProviderInterfaces
        .getDataProviderInterfaces()
        .map((dataProviderInterface) => ({
          ...dataProviderInterface,
          iconUrl: api.staticUrl(
            `providers/${dataProviderInterface.providerClassName.toLowerCase() + ".svg"}`
          ),
        }));
      return {
        items: dataPovidersInterfaces,
      };
    }
  );

  api.post(
    "/data-provider/:providerName/:countFunctionName",
    { schema: dataProviderInterfacesRoutesSchemas.post },
    async (req) => {
      const dataProvidersAPIEndpoints = api.dataProviderInterfaces.getDataProviderAPIEndpoints();
      const providerName = (req.params as any)
        .providerName as keyof typeof dataProvidersAPIEndpoints;
      const countFunctionName = (req.params as any).countFunctionName as string;
      const provider = dataProvidersAPIEndpoints[providerName];
      const countFunction = (provider as any)[countFunctionName];
      const numberOfEligibleAccounts = await countFunction(...(req.body as any).inputs);
      return numberOfEligibleAccounts;
    }
  );
};

export default routes;
