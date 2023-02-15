import { groupRoutesSchemas } from "./group.api.schema";
import { Group } from ".";
import { Api } from "api";

const setDataUrlAndChangeProperties = (api: Api, group: Group) => ({
  ...group,
  properties: {
    ...group.properties,
    tierDistribution: group.properties?.valueDistribution,
  },
  dataUrl: api.groupStore.dataUrl(group),
});

const routes = async (api: Api) => {
  api.get(
    "/groups/:groupName",
    { schema: groupRoutesSchemas.list },
    async (req) => ({
      items: (
        await api.groupStore.search({
          groupName: req.params.groupName,
          latest: req.query.latest,
          timestamp: req.query.timestamp,
        })
      ).map((group) => setDataUrlAndChangeProperties(api, group)),
    })
  );

  api.get(
    "/groups/latests",
    { schema: groupRoutesSchemas.latests },
    async () => ({
      items: Object.values(await api.groupStore.latests()).map((group) =>
        setDataUrlAndChangeProperties(api, group)
      ),
    })
  );
};

export default routes;
