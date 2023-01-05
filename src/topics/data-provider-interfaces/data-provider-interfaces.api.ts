import { dataProviderInterfacesRoutesSchemas } from "./data-provider-interfaces.schema";
import { apiDataProviders } from "@group-generators/helpers/data-providers";
import { Api } from "api";

const routes = async (api: Api) => {
  api.get(
    "/data-provider-interfaces",
    { schema: dataProviderInterfacesRoutesSchemas.list },
    async () => ({
      items: api.dataProviderInterfaces.getdataProviderInterfaces(),
    })
  );

  api.post(
    "/data-provider-interfaces/:providerName/:countFunctionName",
    { schema: dataProviderInterfacesRoutesSchemas.post },
    async (req) => {
      const providerName = (req.params as any)
        .providerName as keyof typeof apiDataProviders;
      const countFunctionName = (req.params as any).countFunctionName as string;
      const provider = apiDataProviders[providerName];
      const countFunction = (provider as any)[countFunctionName];
      const numberOfEligibleAccounts = await countFunction(
        ...(req.body as any).inputs
      );
      return numberOfEligibleAccounts;
    }
  );
};

export default routes;
