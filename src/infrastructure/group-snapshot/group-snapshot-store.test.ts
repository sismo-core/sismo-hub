import { MemoryGroupSnapshotStore } from "infrastructure/group-snapshot/group-snapshot-memory";
import { LocalGroupSnapshotStore } from "infrastructure/group-snapshot/local-group-snapshot-store";
import { GroupSnapshotStore } from "topics/group-snapshot/group-snapshot.store";
import {
  exampleData,
  exampleResolvedIdentifierData,
  testGroupSnapshots,
} from "topics/group-snapshot/test-group-snapshots";

describe("test group snapshots stores", () => {
  const localGroupSnapshotStore = new LocalGroupSnapshotStore(
    `${__dirname}/../../../test-disk-store/unit`
  );

  const memoryGroupSnapshotStore = new MemoryGroupSnapshotStore();
  const testCases: [GroupSnapshotStore[], GroupSnapshotStore[]] = [
    [localGroupSnapshotStore],
    [memoryGroupSnapshotStore],
  ];

  beforeEach(async () => {
    await localGroupSnapshotStore.reset();
    await memoryGroupSnapshotStore.reset();
  });

  it.each(testCases)(
    "Should generate a group snapshot and retrieve from store",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      const groupSnapshots = await groupSnapshotStore.all();
      expect(groupSnapshots).toHaveLength(1);
      expect(groupSnapshots[0]).toBeSameGroupSnapshot(
        testGroupSnapshots.groupSnapshot1_0
      );
    }
  );

  it.each(testCases)("should delete group", async (groupStore) => {
    const savedGroupSnapshot = await groupStore.save(
      testGroupSnapshots.groupSnapshot1_0
    );
    const groups = await groupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    await groupStore.delete(savedGroupSnapshot);
    const groupsAfterDelete = await groupStore.all();
    expect(Object.keys(groupsAfterDelete)).toHaveLength(0);
  });

  it.each(testCases)(
    "Should generate multiple group snapshots and retrieve them from store",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
      const groupSnapshots = await groupSnapshotStore.all();
      expect(groupSnapshots).toHaveLength(2);
      expect(groupSnapshots).toContainGroupSnapshot(
        testGroupSnapshots.groupSnapshot1_0
      );
      expect(groupSnapshots).toContainGroupSnapshot(
        testGroupSnapshots.groupSnapshot1_1
      );
    }
  );

  it.each(testCases)(
    "Should generate multiple group snapshots and retrieve latest by ID",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      const latest = await groupSnapshotStore.latestById(
        testGroupSnapshots.groupSnapshot1_0.groupId
      );
      expect(latest).toBeSameGroupSnapshot(testGroupSnapshots.groupSnapshot1_1);
    }
  );

  it.each(testCases)(
    "Should generate multiple group snapshots and retrieve latest by name",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      const latest = await groupSnapshotStore.latestByName(
        testGroupSnapshots.groupSnapshot1_0.name
      );
      expect(latest).toBeSameGroupSnapshot(testGroupSnapshots.groupSnapshot1_1);
    }
  );

  it.each(testCases)(
    "Should generate multiple group snapshots and search by id and timestamp",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);

      const groupSnapshots = await groupSnapshotStore.search({
        groupId: testGroupSnapshots.groupSnapshot1_0.groupId,
        timestamp: testGroupSnapshots.groupSnapshot1_0.timestamp,
      });

      expect(groupSnapshots).toHaveLength(1);
      expect(groupSnapshots[0]).toBeSameGroupSnapshot(
        testGroupSnapshots.groupSnapshot1_0
      );
    }
  );

  it.each(testCases)(
    "Should generate multiple group snapshots and search by name and timestamp",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);

      const groupSnapshots = await groupSnapshotStore.search({
        groupSnapshotName: testGroupSnapshots.groupSnapshot1_0.name,
        timestamp: testGroupSnapshots.groupSnapshot1_0.timestamp,
      });

      expect(groupSnapshots).toHaveLength(1);
      expect(groupSnapshots[0]).toBeSameGroupSnapshot(
        testGroupSnapshots.groupSnapshot1_0
      );
    }
  );

  it.each(testCases)(
    "Should generate multiple group snapshots and get all by ID",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);
      const latests = await groupSnapshotStore.allByGroupId(
        testGroupSnapshots.groupSnapshot1_0.groupId
      );
      expect(Object.keys(latests)).toHaveLength(2);
      expect(Object.values(latests)).toContainGroupSnapshot(
        testGroupSnapshots.groupSnapshot1_0
      );
      expect(Object.values(latests)).toContainGroupSnapshot(
        testGroupSnapshots.groupSnapshot1_1
      );
    }
  );

  it.each(testCases)(
    "Should generate multiple group snapshots and get all by a name",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);
      const latests = await groupSnapshotStore.allByName(
        testGroupSnapshots.groupSnapshot1_0.name
      );
      expect(Object.keys(latests)).toHaveLength(2);
      expect(Object.values(latests)).toContainGroupSnapshot(
        testGroupSnapshots.groupSnapshot1_0
      );
      expect(Object.values(latests)).toContainGroupSnapshot(
        testGroupSnapshots.groupSnapshot1_1
      );
    }
  );

  it.each(testCases)(
    "Should return undefined when retrieving latest from empty store",
    async (groupSnapshotStore) => {
      expect(
        await groupSnapshotStore.latestById(
          testGroupSnapshots.groupSnapshot1_0.groupId
        )
      ).toBeUndefined();

      expect(
        await groupSnapshotStore.latestByName(
          testGroupSnapshots.groupSnapshot1_0.name
        )
      ).toBeUndefined();
    }
  );

  it.each(testCases)(
    "Should generate a group snapshot and retrieve data from store",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      const groupSnapshot = await groupSnapshotStore.latestById(
        testGroupSnapshots.groupSnapshot1_0.groupId
      );
      expect(await groupSnapshot.data()).toEqual(exampleData);
    }
  );

  it.each(testCases)(
    "Should generate a group snapshot and retrieve resolvedIdentifierData from store",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      const group = await groupSnapshotStore.latestByName(
        testGroupSnapshots.groupSnapshot1_0.name
      );
      expect(await group.resolvedIdentifierData()).toEqual(
        exampleResolvedIdentifierData
      );
    }
  );

  it.each(testCases)(
    "Should get not empty dataUrl from group snapshot",
    async (groupSnapshotStore) => {
      await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
      expect(
        groupSnapshotStore.dataUrl(testGroupSnapshots.groupSnapshot1_0)
      ).toBeTruthy();
    }
  );

  it.each(testCases)(
    "Should throw if groupId and groupName are provided at the same time in a search",
    async (groupSnapshotStore) => {
      await expect(async () => {
        await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);

        await groupSnapshotStore.search({
          groupId: testGroupSnapshots.groupSnapshot1_0.groupId,
          groupSnapshotName: testGroupSnapshots.groupSnapshot1_0.name,
          timestamp: testGroupSnapshots.groupSnapshot1_0.timestamp,
        });
      }).rejects.toThrow();
    }
  );
});
