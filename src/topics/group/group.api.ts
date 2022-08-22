import { groupRoutesSchemas } from "./group.api.schema";
import { Group } from ".";
import { Api } from "api";

const setDataUrl = (api: Api, group: Group): Group & { dataUrl: string } => ({
  ...group,
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
        })
      ).map((group) => setDataUrl(api, group)),
    })
  );

  api.get(
    "/groups/latests",
    { schema: groupRoutesSchemas.latests },
    async () => ({
      items: Object.values(await api.groupStore.latests()).map((group) =>
        setDataUrl(api, group)
      ),
    })
  );
};

export default routes;
