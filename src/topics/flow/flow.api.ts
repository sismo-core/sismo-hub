import { flowsRoutesSchemas } from "./flow.api.schema";
import { Api } from "api";

const routes = async (api: Api) => {
  api.get("/flows", { schema: flowsRoutesSchemas.list }, async () => ({
    items: api.flows.getFlows(),
  }));
};

export default routes;
