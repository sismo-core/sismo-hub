import { MemoryRootsRegistry } from "./infrastructure";
import { initRegistryTree } from ".";
import { generateHydraS1Attester } from "@badges-metadata/base/hydra-s1/hydra-s1-attester";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupGeneratorStore } from "infrastructure/group-generator-store";
import { MemoryGroupSnapshotStore } from "infrastructure/group-snapshot/group-snapshot-memory";
import { MemoryGroupStore } from "infrastructure/group-store";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import {
  AttesterComputeContext,
  AttesterService,
  Network,
  RegistryTreeBuilder,
  RegistryTreeNetworksConfiguration,
} from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { GroupStore, ValueType } from "topics/group";
import { GroupGeneratorService } from "topics/group-generator";
import { groupGenerators } from "topics/group-generator/test-group-generator";
import { testGlobalResolver } from "topics/resolver/test-resolvers";

export const testHydraAttesterNetworkConfiguration: RegistryTreeNetworksConfiguration = {
  [Network.Test]: {
    attesterAddress: "0x1",
    rootsRegistryAddress: "0x2",
  },
};

export const testHydraAttesterConfig = {
  name: "test-attester",
  attestationsCollections: [
    {
      internalCollectionId: 0,
      networks: [Network.Test],
      groupFetcher: async (groupStore: GroupStore) => [await groupStore.latest(`test-group`)],
    },
  ],
};

export const testHydraAttesterNetworkConfigurationTwo: RegistryTreeNetworksConfiguration = {
  [Network.Test]: {
    attesterAddress: "0x10",
    rootsRegistryAddress: "0x20",
  },
};

export const testHydraAttesterConfigTwo = {
  name: "test-attester-two",
  attestationsCollections: [
    {
      internalCollectionId: 10,
      networks: [Network.Test],
      groupFetcher: async (groupStore: GroupStore) => [await groupStore.latest(`test-group-two`)],
    },
  ],
};

describe("Test HydraS1 attester", () => {
  let attesterService: AttesterService;
  let groupGeneratorService: GroupGeneratorService;
  let testRootsRegistry: MemoryRootsRegistry;
  let testAvailableDataStore: AvailableDataStore;
  let testAvailableGroupStore: MemoryFileStore;
  let testGroupStore: MemoryGroupStore;
  let testGroupSnapshotStore: MemoryGroupSnapshotStore;
  let testLogger: MemoryLogger;
  let context: AttesterComputeContext;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testAvailableGroupStore = new MemoryFileStore("");
    testGroupStore = new MemoryGroupStore();
    testGroupSnapshotStore = new MemoryGroupSnapshotStore();
    testRootsRegistry = new MemoryRootsRegistry();
    testLogger = new MemoryLogger();
    attesterService = new AttesterService({
      attesters: {
        [testHydraAttesterConfig.name]: generateHydraS1Attester(
          testHydraAttesterNetworkConfiguration,
          testHydraAttesterConfig
        ),
        [testHydraAttesterConfigTwo.name]: generateHydraS1Attester(
          testHydraAttesterNetworkConfigurationTwo,
          testHydraAttesterConfigTwo
        ),
      },
      availableDataStore: testAvailableDataStore,
      availableGroupStore: testAvailableGroupStore,
      groupStore: testGroupStore,
      groupSnapshotStore: testGroupSnapshotStore,
      logger: testLogger,
      networks: [Network.Test],
    });
    groupGeneratorService = new GroupGeneratorService({
      groupGenerators,
      groupStore: testGroupStore,
      groupSnapshotStore: testGroupSnapshotStore,
      logger: testLogger,
      globalResolver: testGlobalResolver,
      groupGeneratorStore: new MemoryGroupGeneratorStore(),
    });
    context = {
      name: testHydraAttesterConfig.name,
      network: Network.Test,
      generationTimestamp: 1,
      groupStore: testGroupStore,
      groupSnapshotStore: testGroupSnapshotStore,
      availableDataStore: testAvailableDataStore,
      availableGroupStore: testAvailableGroupStore,
      logger: testLogger,
    };

    await groupGeneratorService.saveGroup({
      name: "test-group",
      timestamp: 1,
      description: "test-description",
      specs: "test-specs",
      data: { "0x1": 1, "0x2": 1 },
      resolvedIdentifierData: { "0x1": 1, "0x2": 1 },
      tags: [],
      valueType: ValueType.Info,
    });
    await groupGeneratorService.saveGroup({
      name: "other-group",
      timestamp: 1,
      description: "test-description",
      specs: "test-specs",
      data: { "0x1": 2, "0x2": 2 },
      resolvedIdentifierData: { "0x1": 2, "0x2": 2 },
      tags: [],
      valueType: ValueType.Info,
    });
    await groupGeneratorService.saveGroup({
      name: "test-group-two",
      timestamp: 2,
      description: "test-description",
      specs: "test-specs",
      data: { "0x30": 1, "0x40": 1 },
      resolvedIdentifierData: { "0x30": 1, "0x40": 1 },
      tags: [],
      valueType: ValueType.Info,
    });
  });

  it("Should revert for wrong attester name", () => {
    const fakeAttesterName = "fake-name";
    expect(() => {
      attesterService.getAttesterConfig(fakeAttesterName);
    }).toThrow(`Attester "${fakeAttesterName}" does not exists`);
  });

  it("should generate available groups", async () => {
    await attesterService.compute(testHydraAttesterConfig.name, Network.Test);
    const availableData = await testAvailableDataStore.all();

    const availableGroup = await testAvailableGroupStore.read(availableData[0].identifier);
    expect(Object.keys(availableGroup)).toContain("registryTree");
    expect(availableGroup.registryTree.metadata.leavesCount).toBe(1);

    expect(Object.keys(availableGroup)).toContain("accountTrees");
    expect(availableGroup.accountTrees).toHaveLength(1);
  });

  it("should generate available groups and not register root", async () => {
    await attesterService.compute(testHydraAttesterConfig.name, Network.Test);
    expect(testRootsRegistry.registry).toEqual(new Set());
  });

  it("should generate available groups and register root", async () => {
    const availableData = await attesterService.compute(
      testHydraAttesterConfigTwo.name,
      Network.Test,
      {
        sendOnChain: true,
      }
    );
    expect(availableData.identifier).toBeDefined();
    // expect(
    //   await testRootsRegistry.isAvailable(availableData.identifier)
    // ).toBeTruthy();
  });

  it("should keep only last root with multiple send on chain", async () => {
    const availableData1 = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
        generationTimestamp: 123,
      }
    );
    // Update the Group to have a different root
    await groupGeneratorService.saveGroup({
      name: "test-group",
      timestamp: 3,
      description: "test-description",
      specs: "test-specs",
      data: { "0x1": 2, "0x2": 2, "0x3": 3 },
      resolvedIdentifierData: { "0x1": 2, "0x2": 2, "0x3": 3 },
      tags: [],
      valueType: ValueType.Info,
    });
    const availableData2 = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
        generationTimestamp: 124,
      }
    );

    const attester = attesterService.getAttesterConfig(testHydraAttesterConfig.name);

    const registryTree: RegistryTreeBuilder = initRegistryTree(context, attester, Network.Test);

    const diff = await registryTree.getGroupsAvailableDiff(
      availableData1.identifier,
      availableData2.identifier
    );
    expect(diff).toEqual(`~ Modified Group (test-group) for key 0
  GroupId: 0x19ad9a600c5c070a445a086172bfd73e752e0d7ba85ec5edf6474585cfcdbd56 -> 0x038b2ba20d6a8cc119a9d0d5fdc78f7d552d1f163a1c7eabd3cb49a34d4637a9
  Timestamp: 1970-01-01T00:00:01.000Z -> 1970-01-01T00:00:03.000Z
  Accounts: 3 -> 4
`);
    // expect(testRootsRegistry.registry.size).toBe(1);
    // expect(
    //   await testRootsRegistry.isAvailable(availableData2.identifier)
    // ).toBeTruthy();
    const availableDataInStore = await testAvailableDataStore.search({
      attesterName: testHydraAttesterConfig.name,
      network: Network.Test,
      isOnChain: true,
    });
    expect(availableDataInStore).toHaveLength(1);
    expect(availableDataInStore[0]).toEqual(availableData2);
  });

  it("should test add diff with new attestationsCollections", async () => {
    const availableData1 = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
        generationTimestamp: 123,
      }
    );
    // Add a new attestations collections
    testHydraAttesterConfig.attestationsCollections.push({
      internalCollectionId: 1,
      networks: [Network.Test],
      groupFetcher: async (groupStore: GroupStore) => [await groupStore.latest(`test-group`)],
    });
    const availableData2 = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
        dryRun: true,
      }
    );

    const attester = attesterService.getAttesterConfig(testHydraAttesterConfig.name);

    const registryTree: RegistryTreeBuilder = initRegistryTree(context, attester, Network.Test);

    const diff = await registryTree.getGroupsAvailableDiff(
      availableData1.identifier,
      availableData2.identifier
    );
    expect(diff).toEqual(`+ New Group (test-group) for key 1
  GroupId: 0x1459ecd8e275bb4ed9f1466679dbf2da6256185b6482ed6193007b671bbbd29b
  Timestamp: 1970-01-01T00:00:01.000Z
  Accounts: 3
`);
  });

  it("should test delete diff with removing an attestationsCollections", async () => {
    const availableData1 = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
        generationTimestamp: 123,
      }
    );
    // remove the attestations collections
    testHydraAttesterConfig.attestationsCollections.shift();
    const availableData2 = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
        dryRun: true,
      }
    );
    const attester = attesterService.getAttesterConfig(testHydraAttesterConfig.name);

    const registryTree: RegistryTreeBuilder = initRegistryTree(context, attester, Network.Test);

    const diff = await registryTree.getGroupsAvailableDiff(
      availableData1.identifier,
      availableData2.identifier
    );
    expect(diff).toEqual(`- Delete Group (test-group) for key 0
  GroupId: 0x19ad9a600c5c070a445a086172bfd73e752e0d7ba85ec5edf6474585cfcdbd56
  Timestamp: 1970-01-01T00:00:01.000Z
  Accounts: 3
`);
  });

  // it("should not remove old root from registry if it is same", async () => {
  //   await attesterService.compute(testHydraAttesterConfig.name, Network.Test, {
  //     sendOnChain: true,
  //   });
  //   const availableData = await attesterService.compute(
  //     testHydraAttesterConfig.name,
  //     Network.Test,
  //     {
  //       sendOnChain: true,
  //     }
  //   );
  //   expect(testRootsRegistry.registry.size).toBe(1);
  //   expect(testRootsRegistry.isAvailable(availableData.identifier)).toBeTruthy();
  // });
});
