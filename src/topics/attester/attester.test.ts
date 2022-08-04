import { TestAttester } from "./test-attester";
import { AvailableDataStore } from ".";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";

describe("Test attester", () => {
  let testAttester: TestAttester;
  let testAvailableDataStore: AvailableDataStore;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testAttester = new TestAttester(
      new MemoryGroupStore(),
      testAvailableDataStore,
      new MemoryFileStore("")
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
});
