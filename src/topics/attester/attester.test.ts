import { testAttester, testAttesters } from "./test-attester";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import { LoggerService } from "logger/logger";
import { AttesterService, Network } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { testGroupPropertiesEncoder } from "topics/group-properties-encoder";

describe("Test attester", () => {
  let attesterService: AttesterService;
  let testAvailableDataStore: AvailableDataStore;
  let testLogger: LoggerService;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testLogger = new MemoryLogger();
    attesterService = new AttesterService({
      attesters: testAttesters,
      availableDataStore: testAvailableDataStore,
      availableGroupStore: new MemoryFileStore(""),
      groupStore: new MemoryGroupStore(),
      logger: testLogger,
    });
  });

  it("should fetch groups with internal collection id", async () => {
    const groupsWithId = [];
    for await (const groupWithId of attesterService.fetchGroups(
      testAttester,
      testGroupPropertiesEncoder
    )) {
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
    await attesterService.compute(testAttester.name, Network.Test);
    const availableData = await testAvailableDataStore.all();
    expect(availableData).toHaveLength(1);
    expect(availableData[0].attesterName).toBe(testAttester.name);
    expect(availableData[0].identifier).toBe("0x1");
    expect(availableData[0].transactionHash).toBe(undefined);
  });

  it("should make groups available and send on chain", async () => {
    await attesterService.compute(testAttester.name, Network.Test, {
      sendOnChain: true,
    });
    const availableData = await testAvailableDataStore.all();
    expect(availableData[0].transactionHash).toBe("fakeHash");
  });

  it("should throw error on wrong network", async () => {
    await expect(async () => {
      await attesterService.compute(testAttester.name, Network.Local);
    }).rejects.toThrow();
  });

  it("should throw error compute on not existing attester", async () => {
    await expect(async () => {
      await attesterService.compute("not-exists", Network.Test);
    }).rejects.toThrow();
  });
});
