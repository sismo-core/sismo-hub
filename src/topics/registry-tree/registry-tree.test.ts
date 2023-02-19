import {
  testRegistryTreeConfig,
  testRegistryTreeConfigs,
} from "./test-registry-tree";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupSnapshotStore } from "infrastructure/group-snapshot/group-snapshot-memory";
import { MemoryGroupStore } from "infrastructure/group-store";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import { LoggerService } from "logger/logger";
import { AvailableDataStore } from "topics/available-data";
import { RegistryTreeService, Network } from "topics/registry-tree";

describe("Test registryTree Service", () => {
  let registryTreeService: RegistryTreeService;
  let testAvailableDataStore: AvailableDataStore;
  let testLogger: LoggerService;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testLogger = new MemoryLogger();
    registryTreeService = new RegistryTreeService({
      registryTreesConfigurations: testRegistryTreeConfigs,
      availableDataStore: testAvailableDataStore,
      availableGroupStore: new MemoryFileStore(""),
      groupStore: new MemoryGroupStore(),
      groupSnapshotStore: new MemoryGroupSnapshotStore(),
      logger: testLogger,
      networks: [Network.Test, Network.Local],
    });
  });

  it("Should have an error when trying to compute with a network that was not registered", async () => {
    await expect(async () => {
      await registryTreeService.compute(
        testRegistryTreeConfig.name,
        Network.Mainnet
      );
    }).rejects.toThrow();
  });

  it("should make groups available and save available data", async () => {
    await registryTreeService.compute(
      testRegistryTreeConfig.name,
      Network.Test
    );
    const availableData = await testAvailableDataStore.all();
    expect(availableData).toHaveLength(1);
    expect(availableData[0].registryTreeName).toBe(testRegistryTreeConfig.name);
    expect(availableData[0].identifier).toBe(
      "0x2134e76ac5d21aab186c2be1dd8f84ee880a1e46eaf712f9d371b6df22191f3e"
    );
    expect(availableData[0].transactionHash).toBe(undefined);
  });

  it("should make groups available and send on chain", async () => {
    await registryTreeService.compute(
      testRegistryTreeConfig.name,
      Network.Test,
      {
        sendOnChain: true,
      }
    );
    const availableData = await testAvailableDataStore.all();
    expect(availableData[0].transactionHash).toBe("fake_tx");
  });

  it("should throw error compute on not existing attester", async () => {
    await expect(async () => {
      await registryTreeService.compute("not-exists", Network.Test);
    }).rejects.toThrow();
  });
});
