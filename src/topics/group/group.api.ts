import { groupRoutesSchemas } from "./group.api.schema";
import { Group } from ".";
import { Api } from "api";
import { GroupSnapshot } from "topics/group-snapshot";

const setDataUrlAndChangeProperties = (
  api: Api,
  group: Group,
  snapshot: GroupSnapshot
) => ({
  ...group,
  properties: {
    ...snapshot.properties,
    tierDistribution: snapshot.properties.valueDistribution,
  },
  dataUrl: api.groupSnapshotStore.dataUrl(snapshot),
});

const setDataAndTimestampFromSnapshot = (
  group: Group,
  snapshot: GroupSnapshot
) => ({
  ...group,
  timestamp: snapshot.timestamp ?? 0,
  data: snapshot.data ?? {},
  resolvedIdentifierData: snapshot.resolvedIdentifierData ?? {},
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

      let snapshots: GroupSnapshot[] = [];

      if (req.query.timestamp) {
        snapshots = await api.groupSnapshotStore.search({
          groupId: group.id,
          timestamp: req.query.timestamp,
        });
      }

      if (req.query.latest === true) {
        snapshots = [await api.groupSnapshotStore.latestById(group.id)];
      }

      if (!req.query.timestamp && !req.query.latest) {
        snapshots = await api.groupSnapshotStore.allByGroupId(
          group ? group.id : "0"
        );
      }

      return {
        items: snapshots.map((snapshot) => {
          return setDataUrlAndChangeProperties(
            api,
            setDataAndTimestampFromSnapshot(group, snapshot),
            snapshot
          );
        }),
      };
    }
  );

  api.get(
    "/groups/latests",
    { schema: groupRoutesSchemas.latests },
    async () => {
      const groups = await api.groupStore.all();

      const items = await Promise.all(
        Object.values(groups).map(async (group) => {
          const snapshot = await api.groupSnapshotStore.latestById(group.id);
          return setDataUrlAndChangeProperties(
            api,
            setDataAndTimestampFromSnapshot(group, snapshot),
            snapshot
          );
        })
      );

      return {
        items,
      };
    }
  );
};

export default routes;
