import { groupRoutesSchemas } from "./group.api.schema";
import { Group } from ".";
import { Api } from "api";
import { GroupSnapshot } from "topics/group-snapshot";

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
    async (req) => {
      const group = (
        await api.groupStore.search({
          groupName: req.params.groupName,
          latest: true,
        })
      )[0];

      let snapshots: GroupSnapshot[];

      if (req.query.timestamp) {
        snapshots = await api.groupSnapshotStore.search({
          groupSnapshotId: group ? group.id : "0",
          timestamp: req.query.timestamp,
        });
      }

      if (req.query.latest === true) {
        snapshots = [
          await api.groupSnapshotStore.latestById(group ? group.id : "0"),
        ];
      } else {
        snapshots = await api.groupSnapshotStore.allById(
          group ? group.id : "0"
        );
      }

      return {
        items: snapshots.map((snapshot) => {
          return {
            ...group,
            timestamp: snapshot.timestamp,
            properties: {
              ...group.properties,
              tierDistribution: group.properties?.valueDistribution,
            },
            data: snapshot.data,
            resolvedIdentifierData: snapshot.resolvedIdentifierData,
            dataUrl: api.groupStore.dataUrl(group),
          };
        }),
      };

      // if (req.params.latest) {
      // }

      return {
        items: (
          await api.groupStore.search({
            groupName: req.params.groupName,
            latest: req.query.latest,
            timestamp: req.query.timestamp,
          })
        ).map((group) => setDataUrlAndChangeProperties(api, group)),
      };
    }
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
