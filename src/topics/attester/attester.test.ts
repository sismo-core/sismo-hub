import { TestAttester } from "./test-attester";
import { Network } from ".";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import { AvailableDataStore } from "topics/available-data";

describe("Test attester", () => {
  let testAttester: TestAttester;
  let testAvailableDataStore: AvailableDataStore;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testAttester = new TestAttester(
      testAvailableDataStore,
      new MemoryFileStore(""),
      new MemoryGroupStore()
    );
  });

  it("should fetch groups with internal collection id", async () => {
    const groupsWithId = [];
    for await (const groupWithId of testAttester.fetchGroups()) {
      groupsWithId.push(groupWithId);
    }
    expect(groupsWithId).toHaveLength(3);

    expect(groupsWithId[0].internalCollectionId).toBe(0);
    expect(groupsWithId[0].group.name).toBe("test-group");
    expect(groupsWithId[0].group.timestamp).toBe(1);

    expect(groupsWithId[1].internalCollectionId).toBe(0);
    expect(groupsWithId[1].group.name).toBe("test-group");
    expect(groupsWithId[1].group.timestamp).toBe(2);

    expect(groupsWithId[2].internalCollectionId).toBe(1);
    expect(groupsWithId[2].group.name).toBe("test-group2");
    expect(groupsWithId[2].group.timestamp).toBe(3);
  });

  it("should make groups available and save available data", async () => {
    await testAttester.compute();
    const availableData = await testAvailableDataStore.all();
    expect(availableData).toHaveLength(1);
    expect(availableData[0].attesterName).toBe(testAttester.name);
    expect(availableData[0].metadata.url).toBe(
      "https://fake-available-data-url/"
    );
  });

  it("should have empty badges for other network", async () => {
    const badges = testAttester.getBadges(Network.Mainnet);
    expect(Object.keys(badges)).toHaveLength(0);
  });

  it("should have badges with valid collectionId", async () => {
    const badges = testAttester.getBadges(Network.Polygon);
    expect(Object.keys(badges)).toHaveLength(2);
    expect(badges[0].collectionId).toBe(
      "00000000000000000000000000000000000000000000000000000000000003e9"
    );
    expect(badges[0].name).toBe("Test Badge");
    expect(badges[1].collectionId).toBe(
      "00000000000000000000000000000000000000000000000000000000000003ea"
    );
    expect(badges[1].name).toBe("Test Badge 2");
  });
});
