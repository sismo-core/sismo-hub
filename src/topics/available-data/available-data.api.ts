import { availableDataRoutesSchemas } from "./available-data.api.schema";
import { AvailableData } from "./available-data.store";
import { Api } from "api";

const setUrl = (
  api: Api,
  availableData: AvailableData
): AvailableData & { url: string } => ({
  ...availableData,
  url: api.availableGroupStore.url(availableData.identifier),
});

const routes = async (api: Api) => {
  api.get(
    "/available-data/:network/:attesterName",
    { schema: availableDataRoutesSchemas.list },
    async (req) => ({
      items: (
        await api.availableDataStore.search({
          attesterName: req.params.attesterName,
          network: req.params.network,
          latest: req.query.latest,
          isOnChain: req.query.isOnChain,
        })
      ).map((availableData) => setUrl(api, availableData)),
    })
  );
};

export default routes;
