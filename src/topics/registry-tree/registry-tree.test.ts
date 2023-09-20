import { testRegistryTreeConfig, testRegistryTreeConfigs } from "./test-registry-tree";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupGeneratorStore } from "infrastructure/group-generator-store";
import { MemoryGroupSnapshotStore } from "infrastructure/group-snapshot/group-snapshot-memory";
import { MemoryGroupStore } from "infrastructure/group-store";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import { LoggerService } from "logger/logger";
import { AvailableDataStore } from "topics/available-data";
import { GroupGeneratorService } from "topics/group-generator";
import { groupGenerators } from "topics/group-generator/test-group-generator";
import { RegistryTreeService, Network } from "topics/registry-tree";
import { testGlobalResolver } from "topics/resolver/test-resolvers";

describe("Test registryTree Service", () => {
  let registryTreeService: RegistryTreeService;
  const testAvailableDataStore: AvailableDataStore = new MemoryAvailableDataStore();
  let testLogger: LoggerService;

  const groupStore: MemoryGroupStore = new MemoryGroupStore();
  const groupSnapshotStore: MemoryGroupSnapshotStore = new MemoryGroupSnapshotStore();
  const groupGeneratorStore: MemoryGroupGeneratorStore = new MemoryGroupGeneratorStore();
  const logger: MemoryLogger = new MemoryLogger();

  const groupGeneratorService: GroupGeneratorService = new GroupGeneratorService({
    groupGenerators,
    groupStore,
    groupSnapshotStore,
    groupGeneratorStore,
    globalResolver: testGlobalResolver,
    logger,
  });

  beforeEach(async () => {
    testLogger = new MemoryLogger();
    registryTreeService = new RegistryTreeService({
      registryTreesConfigurations: testRegistryTreeConfigs,
      availableDataStore: testAvailableDataStore,
      availableGroupStore: new MemoryFileStore(""),
      groupStore,
      groupSnapshotStore,
      logger: testLogger,
      networks: [Network.Test, Network.Local],
    });

    await testAvailableDataStore.reset();
    await groupGeneratorStore.reset();
    await groupStore.reset();
    await groupGeneratorStore.reset();
  });

  it("Should have an error when trying to compute with a network that was not registered", async () => {
    await expect(async () => {
      await registryTreeService.compute(testRegistryTreeConfig.name, Network.Mainnet);
    }).rejects.toThrow();
  });

  it("should make groups available and save available data", async () => {
    await registryTreeService.compute(testRegistryTreeConfig.name, Network.Test);
    const availableData = await testAvailableDataStore.all();
    expect(availableData).toHaveLength(1);
    expect(availableData[0].registryTreeName).toBe(testRegistryTreeConfig.name);
    expect(availableData[0].identifier).toBe(
      "0x2134e76ac5d21aab186c2be1dd8f84ee880a1e46eaf712f9d371b6df22191f3e"
    );
    expect(availableData[0].transactionHash).toBe(undefined);
  });

  it("should make groups available and send on chain", async () => {
    await registryTreeService.compute(testRegistryTreeConfig.name, Network.Test, {
      sendOnChain: true,
    });
    const availableData = await testAvailableDataStore.all();
    expect(availableData[0].transactionHash).toBe("fake_tx");
  });

  it("should throw error compute on not existing attester", async () => {
    await expect(async () => {
      await registryTreeService.compute("not-exists", Network.Test);
    }).rejects.toThrow();
  });

  it("should make groups available and keep the last root onchain", async () => {
    // compute root for the first time
    await registryTreeService.compute(testRegistryTreeConfig.name, Network.Test, {
      sendOnChain: true,
      generationTimestamp: 1,
    });
    const availableData = await testAvailableDataStore.all();
    expect(availableData.length).toEqual(1);
    expect(availableData[0].isOnChain).toEqual(true);

    // compute root for the second time
    // with a new group
    // the two roots should still be onchain
    await groupGeneratorService.generateGroups("test-generator", {
      timestamp: 1,
    });
    await registryTreeService.compute(testRegistryTreeConfig.name, Network.Test, {
      sendOnChain: true,
      generationTimestamp: 2,
    });
    const availableData2 = await testAvailableDataStore.all();
    expect(availableData2.length).toEqual(2);
    expect(availableData2[0].isOnChain).toEqual(true);
    expect(availableData2[1].isOnChain).toEqual(true);

    // compute root for the third time
    // with a new group
    // the first root should be offchain
    // the second root should still be onchain
    // the third root should be onchain since it is registered
    await groupGeneratorService.generateGroups("dependent-generator", {
      timestamp: 1,
    });
    await registryTreeService.compute(testRegistryTreeConfig.name, Network.Test, {
      sendOnChain: true,
    });

    const availableData3 = await testAvailableDataStore.all();
    expect(availableData3.length).toEqual(3);
    expect(availableData3[0].isOnChain).toEqual(false);
    expect(availableData3[0].identifier).toEqual(availableData2[0].identifier);
    expect(availableData3[1].isOnChain).toEqual(true);
    expect(availableData3[1].identifier).toEqual(availableData2[1].identifier);
    expect(availableData3[2].isOnChain).toEqual(true);
  });
});
