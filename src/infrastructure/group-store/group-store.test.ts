import { LocalGroupStore, MemoryGroupStore } from ".";
import { GroupStore } from "topics/group";
import { testGroups, exampleData } from "topics/group/test-groups";

describe("test groups stores", () => {
  const localGroupStore = new LocalGroupStore(
    `${__dirname}/../../../test-disk-store/unit`
  );
  const memoryGroupStore = new MemoryGroupStore();
  const testCases: [GroupStore[], GroupStore[]] = [
    [localGroupStore],
    [memoryGroupStore],
  ];

  beforeEach(() => {
    localGroupStore.reset();
    memoryGroupStore.reset();
  });

  it.each(testCases)(
    "Should generate a group and retrieve from store",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      const groups = await groupStore.all();
      expect(groups).toHaveLength(1);
      expect(groups[0]).toBeSameGroup(testGroups.group1_0);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and retrieve them from store",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      await groupStore.save(testGroups.group1_1);
      const groups = await groupStore.all();
      expect(groups).toHaveLength(2);
      expect(groups).toContainGroup(testGroups.group1_0);
      expect(groups).toContainGroup(testGroups.group1_1);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and retrieve latest",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_1);
      await groupStore.save(testGroups.group1_0);
      const latest = await groupStore.latest(testGroups.group1_0.name);
      expect(latest).toBeSameGroup(testGroups.group1_1);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and search by name",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      await groupStore.save(testGroups.group1_1);
      await groupStore.save(testGroups.group2_0);

      const groups = await groupStore.search({
        groupName: testGroups.group1_0.name,
      });

      expect(groups).toHaveLength(2);
      expect(groups).toContainGroup(testGroups.group1_0);
      expect(groups).toContainGroup(testGroups.group1_1);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and search by name and latest",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      await groupStore.save(testGroups.group1_1);
      await groupStore.save(testGroups.group2_0);

      const latest1 = await groupStore.search({
        groupName: testGroups.group1_0.name,
        latest: true,
      });
      expect(latest1[0]).toBeSameGroup(testGroups.group1_1);

      const latest2 = await groupStore.search({
        groupName: testGroups.group2_0.name,
        latest: true,
      });
      expect(latest2[0]).toBeSameGroup(testGroups.group2_0);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and get latests",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      await groupStore.save(testGroups.group1_1);
      await groupStore.save(testGroups.group2_0);

      const latests = await groupStore.latests();
      expect(Object.keys(latests)).toHaveLength(2);
      expect(latests[testGroups.group1_0.name]).toBeSameGroup(
        testGroups.group1_1
      );
      expect(latests[testGroups.group2_0.name]).toBeSameGroup(
        testGroups.group2_0
      );
    }
  );

  it.each(testCases)(
    "Should throw error when retrieving latest from empty store",
    async (groupStore) => {
      await expect(async () => {
        await groupStore.latest(testGroups.group1_0.name);
      }).rejects.toThrow();
    }
  );

  it.each(testCases)(
    "Should generate a group and retrieve data from store",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      const group = await groupStore.latest(testGroups.group1_0.name);
      expect(await group.data()).toEqual(exampleData);
    }
  );

  it.each(testCases)(
    "Should get not empty dataUrl from group",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      expect(groupStore.dataUrl(testGroups.group1_0)).toBeTruthy();
    }
  );
});
