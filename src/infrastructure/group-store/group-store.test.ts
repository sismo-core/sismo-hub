import "reflect-metadata";
import { DependencyContainer } from "tsyringe";
import { GroupStore } from "../../topics/group";
import { createTestGroups, exampleData } from "../../topics/group/test-groups";
import { getMemoryContainer, getTestLocalContainer } from "../container";

const getTestMemoryContainer = () => {
  const container = getMemoryContainer();
  container.clearInstances();
  return container;
};

const getGroupStore = (container: DependencyContainer): GroupStore => {
  return container.resolve("GroupStore");
};

describe("test groups stores", () => {
  const testCases = [[getTestMemoryContainer], [getTestLocalContainer]];

  it.each(testCases)(
    "Should generate a group and retrieve from store",
    async (getContainer) => {
      const container = getContainer();
      const testGroups = createTestGroups(container);
      const groupStore = getGroupStore(container);
      await testGroups.group1_0.save();
      const groups = await groupStore.all();
      expect(groups).toHaveLength(1);
      expect(groups[0].json).toEqual(testGroups.group1_0.json);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and retrieve them from store",
    async (getContainer) => {
      const container = getContainer();
      const testGroups = createTestGroups(container);
      const groupStore = getGroupStore(container);
      await testGroups.group1_0.save();
      await testGroups.group1_1.save();
      const groups = (await groupStore.all()).map((group) => group.json);
      expect(groups).toHaveLength(2);
      expect(groups).toContainEqual(testGroups.group1_0.json);
      expect(groups).toContainEqual(testGroups.group1_1.json);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and retrieve latest",
    async (getContainer) => {
      const container = getContainer();
      const testGroups = createTestGroups(container);
      const groupStore = getGroupStore(container);
      await testGroups.group1_1.save();
      await testGroups.group1_0.save();
      const latest = await groupStore.latest(testGroups.group1_0.name);
      expect(latest.json).toEqual(testGroups.group1_1.json);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and search",
    async (getContainer) => {
      const container = getContainer();
      const testGroups = createTestGroups(container);
      const groupStore = getGroupStore(container);
      await testGroups.group1_0.save();
      await testGroups.group1_1.save();
      await testGroups.group2_0.save();

      const groups1 = (
        await groupStore.search({ groupName: testGroups.group1_0.name })
      ).map((group) => group.json);
      expect(groups1).toHaveLength(2);
      expect(groups1).toContainEqual(testGroups.group1_0.json);
      expect(groups1).toContainEqual(testGroups.group1_1.json);

      const groups2 = (
        await groupStore.search({ groupName: testGroups.group2_0.name })
      ).map((group) => group.json);
      expect(groups2).toHaveLength(1);
      expect(groups2).toContainEqual(testGroups.group2_0.json);

      const latest1 = await groupStore.search({
        groupName: testGroups.group1_0.name,
        latest: true,
      });
      expect(latest1[0].json).toEqual(testGroups.group1_1.json);

      const latest2 = await groupStore.search({
        groupName: testGroups.group2_0.name,
        latest: true,
      });
      expect(latest2[0].json).toEqual(testGroups.group2_0.json);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and get latests",
    async (getContainer) => {
      const container = getContainer();
      const testGroups = createTestGroups(container);
      const groupStore = getGroupStore(container);
      await testGroups.group1_0.save();
      await testGroups.group1_1.save();
      await testGroups.group2_0.save();

      const latests = await groupStore.latests();
      expect(Object.keys(latests)).toHaveLength(2);
      expect(latests[testGroups.group1_0.name].json).toEqual(
        testGroups.group1_1.json
      );
      expect(latests[testGroups.group2_0.name].json).toEqual(
        testGroups.group2_0.json
      );
    }
  );

  it.each(testCases)(
    "Should throw error when retrieving latest from empty store",
    async (getContainer) => {
      const container = getContainer();
      const testGroups = createTestGroups(container);
      const groupStore = getGroupStore(container);
      await expect(async () => {
        await groupStore.latest(testGroups.group1_0.name);
      }).rejects.toThrow();
    }
  );

  it.each(testCases)(
    "Should generate a group and retrieve data locally",
    async (getContainer) => {
      const container = getContainer();
      const testGroups = createTestGroups(container);
      expect(await testGroups.group1_0.data()).toEqual(exampleData);
    }
  );

  it.each(testCases)(
    "Should generate a group and retrieve data from store",
    async (getContainer) => {
      const container = getContainer();
      const testGroups = createTestGroups(container);
      const groupStore = getGroupStore(container);
      await testGroups.group1_0.save();
      const group = await groupStore.latest(testGroups.group1_0.name);
      expect(await group.data()).toEqual(exampleData);
    }
  );

  it.each(testCases)(
    "Should get not empty dataUrl from group",
    async (getContainer) => {
      const container = getContainer();
      const testGroups = createTestGroups(container);
      const groupStore = getGroupStore(container);
      await testGroups.group1_0.save();
      expect(testGroups.group1_0.dataUrl).toBeTruthy();
      const group = await groupStore.latest(testGroups.group1_0.name);
      expect(await group.data()).toEqual(exampleData);
    }
  );
});
