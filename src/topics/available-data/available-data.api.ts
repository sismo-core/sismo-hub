import { availableDataRoutesSchemas } from "./available-data.api.schema";
import { AvailableData } from "./available-data.store";
import { Api } from "api";

const setUrl = (
  api: Api,
  availableData: AvailableData
): AvailableData & { url: string; attesterName: string } => ({
  ...availableData,
  attesterName: availableData.registryTreeName,
  url: api.availableGroupStore.url(availableData.identifier),
});

const routes = async (api: Api) => {
  api.get(
    "/available-data/:network/:registryTreeName",
    { schema: availableDataRoutesSchemas.list },
    async (req) => ({
      items: (
        await api.availableDataStore.search({
          registryTreeName: req.params.registryTreeName,
          network: req.params.network,
          latest: req.query.latest,
          isOnChain: req.query.isOnChain,
        })
      ).map((availableData) => setUrl(api, availableData)),
    })
  );
};

export default routes;
