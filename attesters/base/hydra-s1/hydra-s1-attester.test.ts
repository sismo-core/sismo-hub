import { HydraS1Attester } from "./hydra-s1-attester";
import { ValueType } from "topics/group";
import { AttestationsCollection } from "topics/attestations-collection";
import { Badge } from "topics/badge";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryGroupStore } from "infrastructure/group-store";
import { AvailableDataStore } from "topics/attester";
import FileStore from "file-store";
import { MemoryFileStore } from "infrastructure/file-store";

export class TestHydraAttester extends HydraS1Attester {
  name = "test-attester";
  collectionIdFirst = 1000;
  attestationsCollections = [
    new AttestationsCollection({
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
      badge: new Badge({
        name: "Test Badge",
        description: "Test Badge",
        image: "./badges/test.svg",
        requirements: [],
      }),
    }),
  ];
}

const parseMemoryUrl = (url: string) => url.substring(9);

describe("Test HydraS1 attester", () => {
  let testAttester: TestHydraAttester;
  let testAvailableDataStore: AvailableDataStore;
  let testAvailableGroupStore: FileStore;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testAvailableGroupStore = new MemoryFileStore("");
    testAttester = new TestHydraAttester(
      new MemoryGroupStore(),
      testAvailableDataStore,
      testAvailableGroupStore
    );
  });

  it("should generate available groups", async () => {
    await testAttester.compute();
    const availableData = await testAvailableDataStore.all();

    expect(availableData).toHaveLength(1);
    const availableGroup = await testAvailableGroupStore.read(
      parseMemoryUrl(availableData[0].metadata.url)
    );
    expect(Object.keys(availableGroup)).toContain("registryTree");
    expect(availableGroup.registryTree.metadata.leavesCount).toBe(2);

    expect(Object.keys(availableGroup)).toContain("accountTrees");
    expect(availableGroup.accountTrees).toHaveLength(2);
  });
});
