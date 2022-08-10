import { HydraS1Attester } from "./hydra-s1-attester";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import { AvailableDataStore, Network } from "topics/attester";
import { ValueType } from "topics/group";

export class TestHydraAttester extends HydraS1Attester {
  name = "test-attester";
  networks = {
    [Network.Polygon]: { address: "", collectionIdFirst: 1001 },
  };
  attestationsCollections = [
    {
      internalCollectionId: 0,
      groupFetcher: async () => [
        {
          name: "test-group",
          timestamp: 1,
          data: async () => ({ "0x1": 1, "0x2": 1 }),
          tags: [],
          valueType: ValueType.Info,
        },
        {
          name: "test-group",
          timestamp: 2,
          data: async () => ({ "0x3": 1, "0x4": 1 }),
          tags: [],
          valueType: ValueType.Info,
        },
      ],
      badge: {
        name: "Test Badge",
        description: "Test Badge",
        image: "./badges/test.svg",
        attributes: [],
        requirements: [],
      },
    },
  ];
}

describe("Test HydraS1 attester", () => {
  let testAttester: TestHydraAttester;
  let testAvailableDataStore: AvailableDataStore;
  let testAvailableGroupStore: MemoryFileStore;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testAvailableGroupStore = new MemoryFileStore("");
    testAttester = new TestHydraAttester(
      testAvailableDataStore,
      testAvailableGroupStore,
      new MemoryGroupStore()
    );
  });

  it("should generate available groups", async () => {
    await testAttester.compute();
    const availableData = await testAvailableDataStore.all();

    expect(availableData).toHaveLength(1);
    const availableGroup = await testAvailableGroupStore.readFromUrl(
      availableData[0].metadata.url
    );
    expect(Object.keys(availableGroup)).toContain("registryTree");
    expect(availableGroup.registryTree.metadata.leavesCount).toBe(2);

    expect(Object.keys(availableGroup)).toContain("accountTrees");
    expect(availableGroup.accountTrees).toHaveLength(2);
  });
});
