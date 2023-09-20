import { Api } from "api";
import { groupSnapshotRoutesSchemas } from "topics/group-snapshot/group-snapshot.schema";
import { GroupSnapshot } from "topics/group-snapshot/group-snapshot.types";

const setDataUrl = (
  api: Api,
  groupSnapshot: GroupSnapshot
): GroupSnapshot & { dataUrl: string } => ({
  ...groupSnapshot,
  dataUrl: api.groupSnapshotStore.dataUrl(groupSnapshot),
});

const routes = async (api: Api) => {
  api.get(
    "/group-snapshots/:groupId",
    { schema: groupSnapshotRoutesSchemas.listById },
    async (req) => {
      if (!req.query.timestamp) {
        return {
          items: (await api.groupSnapshotStore.allByGroupId(req.params.groupId)).map(
            (groupSnapshot) => setDataUrl(api, groupSnapshot)
          ),
        };
      }
      return {
        items: (
          await api.groupSnapshotStore.search({
            groupId: req.params.groupId,
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
          items: (await api.groupSnapshotStore.allByName(req.params.groupName)).map(
            (groupSnapshot) => setDataUrl(api, groupSnapshot)
          ),
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

  api.get("/group-snapshots/latests", { schema: groupSnapshotRoutesSchemas.latests }, async () => {
    const groupSnapshots = await api.groupSnapshotStore.search({ timestamp: "latest" });

    return {
      items: Object.values(groupSnapshots).map((groupSnapshot) => setDataUrl(api, groupSnapshot)),
    };
  });

  api.get("/group-snapshots", { schema: groupSnapshotRoutesSchemas.listByIds }, async (req) => {
    const groupIds = req.query.groupIds?.split(",") as string[];

    const snapshotsById = groupIds.map(async (groupId): Promise<GroupSnapshot[]> => {
      const allSnapshotsForGroupId: GroupSnapshot[] = (
        await api.groupSnapshotStore.allByGroupId(groupId)
      ).map((snapshot) => {
        return setDataUrl(api, snapshot);
      });
      return allSnapshotsForGroupId;
    });

    return {
      items: (await Promise.all(snapshotsById)).flat(),
    };
  });
};

export default routes;
