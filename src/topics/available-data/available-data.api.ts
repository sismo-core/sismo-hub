import { availableDataRoutesSchemas } from "./available-data.api.schema";
import { Api } from "api";

const routes = async (api: Api) => {
  api.get(
    "/available-data/:attesterName",
    { schema: availableDataRoutesSchemas.list },
    async (request) => ({
      items: await api.availableDataStore.search({
        attesterName: request.params.attesterName,
        latest: request.query.latest,
      }),
    })
  );
};

export default routes;
