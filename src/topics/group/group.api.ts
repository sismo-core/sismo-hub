import { groupRoutesSchemas } from "./group.api.schema";
import { Group } from ".";
import { Api } from "api";
import { GroupSnapshot } from "topics/group-snapshot";

const setDataUrlAndChangeProperties = (api: Api, group: Group, snapshot: GroupSnapshot) => ({
  ...group,
  properties: {
    ...snapshot.properties,
    tierDistribution: snapshot.properties.valueDistribution,
  },
  dataUrl: api.groupSnapshotStore.dataUrl(snapshot),
});

const setDataAndTimestampFromSnapshot = (group: Group, snapshot: GroupSnapshot) => ({
  ...group,
  publicContacts: group.publicContacts ?? [],
  timestamp: snapshot.timestamp ?? 0,
  data: snapshot.data ?? {},
  resolvedIdentifierData: snapshot.resolvedIdentifierData ?? {},
});

const routes = async (api: Api) => {
  api.get("/groups/:groupName", { schema: groupRoutesSchemas.list }, async (req) => {
    const isGroupId = req.params.groupName.match(/^0x[0-9a-fA-F]{20,32}$/);
    const group: Group = (
      await api.groupStore.search({
        ...(isGroupId ? { groupId: req.params.groupName } : { groupName: req.params.groupName }),
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
      snapshots = await api.groupSnapshotStore.allByGroupId(group ? group.id : "0");
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
  });

  api.get("/groups/latests", { schema: groupRoutesSchemas.latests }, async () => {
    // resolve all groups and all latests snapshots in parallel
    const [groups, latestsGroupSnapshot] = await Promise.all([
      api.groupStore.all(),
      api.groupSnapshotStore.search({ timestamp: "latest" }),
    ]);

    const items = Object.values(groups).map((group) => {
      const snapshot = latestsGroupSnapshot.find((snapshot) => snapshot.groupId === group.id);
      if (!snapshot) {
        throw new Error(`No latest snapshot found for group ${group.id}`);
      }
      return setDataUrlAndChangeProperties(
        api,
        setDataAndTimestampFromSnapshot(group, snapshot),
        snapshot
      );
    });

    return {
      items,
    };
  });

  api.get(
    "/groups/compute-id/:groupName",
    { schema: groupRoutesSchemas.computeId },
    async (req) => {
      const { newId: groupId, groupName } = await api.groupStore.getNewId(req.params.groupName);
      return {
        groupId,
        groupName,
      };
    }
  );
};

export default routes;
