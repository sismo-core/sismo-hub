import { Api } from "api";
import { groupSnapshotRoutesSchemas } from "topics/group-snapshot/group-snapshot.schema";
import { GroupSnapshot } from "topics/group-snapshot/group-snapshot.types";

const setDataUrl = (
  api: Api,
  group: GroupSnapshot
): GroupSnapshot & { dataUrl: string } => ({
  ...group,
  dataUrl: api.groupStore.dataUrl(group),
});

const routes = async (api: Api) => {
  api.get(
    "/group-snapshots/:groupId",
    { schema: groupSnapshotRoutesSchemas.listById },
    async (req) => {
      if (!req.query.timestamp) {
        return {
          items: (await api.groupSnapshotStore.allById(req.params.groupId)).map(
            (groupSnapshot) => setDataUrl(api, groupSnapshot)
          ),
        };
      }
      return {
        items: (
          await api.groupSnapshotStore.search({
            groupSnapshotId: req.params.groupId,
            timestamp: req.query.timestamp,
          })
        ).map((groupSnapshot) => setDataUrl(api, groupSnapshot)),
      };
    }
  );

  api.get(
    "/group-snapshots/name/:groupName",
    { schema: groupSnapshotRoutesSchemas.listByName },
    async (req) => {
      if (!req.query.timestamp) {
        return {
          items: (
            await api.groupSnapshotStore.allByName(req.params.groupName)
          ).map((groupSnapshot) => setDataUrl(api, groupSnapshot)),
        };
      }
      return {
        items: (
          await api.groupSnapshotStore.search({
            groupSnapshotName: req.params.groupName,
            timestamp: req.query.timestamp,
          })
        ).map((groupSnapshot) => setDataUrl(api, groupSnapshot)),
      };
    }
  );

  api.get(
    "/group-snapshots/latests",
    { schema: groupSnapshotRoutesSchemas.latests },
    async () => ({
      items: Object.values(await api.groupSnapshotStore.latests()).map(
        (group) => setDataUrl(api, group)
      ),
    })
  );
};

export default routes;
