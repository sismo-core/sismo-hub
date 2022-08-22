import { HydraS1Attester } from "./hydra-s1-attester";

import { MemoryRootsRegistry } from "./infrastructure";
import {
  HydraS1NetworkConfiguration,
  IRootsRegistry,
} from "@attesters/base/hydra-s1/hydra-s1.types";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import { Network } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { ValueType } from "topics/group";

export class TestHydraAttester extends HydraS1Attester {
  name = "test-attester";
  networks = {
    [Network.Test]: {
      collectionIdFirst: 1001,
      attesterAddress: "0x1",
      rootsRegistryAddress: "0x2",
    },
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
        attributes: {},
        requirements: [],
      },
    },
  ];

  memoryTestRegistry = new MemoryRootsRegistry();

  protected async getRootsRegistry(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    network: Network,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    networkConfiguration: HydraS1NetworkConfiguration
  ): Promise<IRootsRegistry> {
    return this.memoryTestRegistry;
  }
}

describe("Test HydraS1 attester", () => {
  let testAttester: TestHydraAttester;
  let testAvailableDataStore: AvailableDataStore;
  let testAvailableGroupStore: MemoryFileStore;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testAvailableGroupStore = new MemoryFileStore("");
    testAttester = new TestHydraAttester({
      availableDataStore: testAvailableDataStore,
      availableGroupStore: testAvailableGroupStore,
      groupStore: new MemoryGroupStore(),
    });
  });

  it("should generate available groups", async () => {
    await testAttester.compute(Network.Test);
    const availableData = await testAvailableDataStore.all();

    const availableGroup = await testAvailableGroupStore.read(
      availableData[0].identifier
    );
    expect(Object.keys(availableGroup)).toContain("registryTree");
    expect(availableGroup.registryTree.metadata.leavesCount).toBe(2);

    expect(Object.keys(availableGroup)).toContain("accountTrees");
    expect(availableGroup.accountTrees).toHaveLength(2);
  });

  it("should generate available groups and not register root", async () => {
    await testAttester.compute(Network.Test);
    expect(testAttester.memoryTestRegistry.registry).toEqual(new Set());
  });

  it("should generate available groups and register root", async () => {
    const availableData = await testAttester.compute(Network.Test, {
      sendOnChain: true,
    });
    expect(
      await testAttester.memoryTestRegistry.isAvailable(
        availableData.identifier
      )
    ).toBeTruthy();
  });

  it("should keep only last root with multiple send on chain", async () => {
    await testAttester.compute(Network.Test, { sendOnChain: true });
    // Update Group fetcher to have different root
    testAttester.attestationsCollections[0].groupFetcher = async () => [
      {
        name: "other-group",
        timestamp: 1,
        data: async () => ({ "0x1": 2, "0x2": 2 }),
        tags: [],
        valueType: ValueType.Info,
      },
    ];
    const availableData = await testAttester.compute(Network.Test, {
      sendOnChain: true,
    });
    expect(testAttester.memoryTestRegistry.registry.size).toBe(1);
    expect(
      await testAttester.memoryTestRegistry.isAvailable(
        availableData.identifier
      )
    ).toBeTruthy();
    const availableDataInStore = await testAvailableDataStore.search({
      attesterName: testAttester.name,
      network: Network.Test,
      isOnChain: true,
    });
    expect(availableDataInStore).toHaveLength(1);
    expect(availableDataInStore[0]).toEqual(availableData);
  });
});
