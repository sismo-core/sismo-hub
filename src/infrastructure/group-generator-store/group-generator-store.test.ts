import { LocalGroupGeneratorStore, MemoryGroupGeneratorStore } from ".";
import { GroupGeneratorStore } from "topics/group-generator";
import { testGeneratorGenerations } from "topics/group-generator/test-group-generator";

describe("test group generator test", () => {
  const memoryStore = new MemoryGroupGeneratorStore();
  const localStore = new LocalGroupGeneratorStore(`${__dirname}/../../../test-disk-store/unit`);

  const testCases: [GroupGeneratorStore[], GroupGeneratorStore[]] = [[memoryStore], [localStore]];

  beforeEach(async () => {
    await localStore.reset();
    await memoryStore.reset();
  });

  it.each(testCases)(
    "Should save a group generator generation and retrieve from store",
    async (store) => {
      await store.save(testGeneratorGenerations.testGeneration1_0);
      const groupGeneratorGenerations = await store.all();
      expect(groupGeneratorGenerations).toHaveLength(1);
      expect(groupGeneratorGenerations[0]).toEqual(testGeneratorGenerations.testGeneration1_0);
    }
  );

  it.each(testCases)(
    "Should save multiple group generator generation and retrieve them from store",
    async (store) => {
      await store.save(testGeneratorGenerations.testGeneration1_0);
      await store.save(testGeneratorGenerations.testGeneration2_0);
      const groupGeneratorGenerations = await store.all();

      expect(groupGeneratorGenerations).toHaveLength(2);
      expect(groupGeneratorGenerations[0]).toEqual(testGeneratorGenerations.testGeneration1_0);
      expect(groupGeneratorGenerations[1]).toEqual(testGeneratorGenerations.testGeneration2_0);
    }
  );

  it.each(testCases)(
    "Should generate multiple group generator generation and search by name",
    async (store) => {
      await store.save(testGeneratorGenerations.testGeneration1_0);
      await store.save(testGeneratorGenerations.testGeneration1_1);
      await store.save(testGeneratorGenerations.testGeneration2_0);

      const groupGeneratorGenerations = await store.search({
        generatorName: testGeneratorGenerations.testGeneration1_0.name,
      });
      expect(groupGeneratorGenerations).toHaveLength(2);
      expect(groupGeneratorGenerations).toContainEqual(testGeneratorGenerations.testGeneration1_0);
      expect(groupGeneratorGenerations).toContainEqual(testGeneratorGenerations.testGeneration1_1);
    }
  );

  it.each(testCases)(
    "Should generate multiple group generator generation and search by name and latest",
    async (store) => {
      await store.save(testGeneratorGenerations.testGeneration1_0);
      await store.save(testGeneratorGenerations.testGeneration1_1);
      await store.save(testGeneratorGenerations.testGeneration2_0);

      const latest1 = await store.search({
        generatorName: testGeneratorGenerations.testGeneration1_0.name,
        latest: true,
      });
      expect(latest1[0]).toEqual(testGeneratorGenerations.testGeneration1_1);

      const latest2 = await store.search({
        generatorName: testGeneratorGenerations.testGeneration2_0.name,
        latest: true,
      });
      expect(latest2[0]).toEqual(testGeneratorGenerations.testGeneration2_0);
    }
  );

  it.each(testCases)("Should search latest in empty store and get empty array", async (store) => {
    const latest1 = await store.search({
      generatorName: testGeneratorGenerations.testGeneration1_0.name,
      latest: true,
    });
    expect(latest1).toHaveLength(0);
  });
});
