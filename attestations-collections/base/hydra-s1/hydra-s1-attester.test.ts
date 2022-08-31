import { MemoryRootsRegistry } from "./infrastructure";
import { generateHydraS1Attester, RootsRegistryFactory } from ".";
import { HydraS1NetworkConfiguration } from "@attestations-collections/base/hydra-s1/hydra-s1.types";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import {
  Attester,
  AttesterComputeContext,
  AttesterService,
  Network,
} from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { ValueType } from "topics/group";

export const testHydraAttesterNetworkConfiguration: {
  [network in Network]?: HydraS1NetworkConfiguration;
} = {
  [Network.Test]: {
    attesterAddress: "0x1",
    rootsRegistryAddress: "0x2",
  },
};

export const testHydraAttesterConfig: Omit<
  Attester,
  "sendOnChain" | "makeGroupsAvailable"
> = {
  name: "test-attester",
  networks: [Network.Test],
  attestationsCollections: [
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
    },
  ],
};

describe("Test HydraS1 attester", () => {
  let attesterService: AttesterService;
  let testRootsRegistry: MemoryRootsRegistry;
  let testAvailableDataStore: AvailableDataStore;
  let testAvailableGroupStore: MemoryFileStore;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testAvailableGroupStore = new MemoryFileStore("");
    testRootsRegistry = new MemoryRootsRegistry();
    const getTestRegistry: RootsRegistryFactory = (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      computeContext: AttesterComputeContext
    ) => testRootsRegistry;
    attesterService = new AttesterService({
      attesters: {
        [testHydraAttesterConfig.name]: generateHydraS1Attester(
          testHydraAttesterNetworkConfiguration,
          testHydraAttesterConfig,
          getTestRegistry
        ),
      },
      availableDataStore: testAvailableDataStore,
      availableGroupStore: testAvailableGroupStore,
      groupStore: new MemoryGroupStore(),
    });
  });

  it("should generate available groups", async () => {
    await attesterService.compute(testHydraAttesterConfig.name, Network.Test);
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
    await attesterService.compute(testHydraAttesterConfig.name, Network.Test);
    expect(testRootsRegistry.registry).toEqual(new Set());
  });

  it("should generate available groups and register root", async () => {
    const availableData = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
      }
    );
    expect(
      await testRootsRegistry.isAvailable(availableData.identifier)
    ).toBeTruthy();
  });

  it("should keep only last root with multiple send on chain", async () => {
    await attesterService.compute(testHydraAttesterConfig.name, Network.Test, {
      sendOnChain: true,
    });
    // Update Group fetcher to have different root
    testHydraAttesterConfig.attestationsCollections[0].groupFetcher =
      async () => [
        {
          name: "other-group",
          timestamp: 1,
          data: async () => ({ "0x1": 2, "0x2": 2 }),
          tags: [],
          valueType: ValueType.Info,
        },
      ];
    const availableData = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
      }
    );
    expect(testRootsRegistry.registry.size).toBe(1);
    expect(
      await testRootsRegistry.isAvailable(availableData.identifier)
    ).toBeTruthy();
    const availableDataInStore = await testAvailableDataStore.search({
      attesterName: testHydraAttesterConfig.name,
      network: Network.Test,
      isOnChain: true,
    });
    expect(availableDataInStore).toHaveLength(1);
    expect(availableDataInStore[0]).toEqual(availableData);
  });

  it("should not remove old root from registry if it is same", async () => {
    await attesterService.compute(testHydraAttesterConfig.name, Network.Test, {
      sendOnChain: true,
    });
    const availableData = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
      }
    );
    expect(testRootsRegistry.registry.size).toBe(1);
    expect(
      testRootsRegistry.isAvailable(availableData.identifier)
    ).toBeTruthy();
  });

  it("should throw error for network not configured", async () => {
    const attesterService = new AttesterService({
      attesters: {
        [testHydraAttesterConfig.name]: generateHydraS1Attester(
          {},
          testHydraAttesterConfig
        ),
      },
      availableDataStore: testAvailableDataStore,
      availableGroupStore: testAvailableGroupStore,
      groupStore: new MemoryGroupStore(),
    });
    await expect(async () => {
      await attesterService.compute(
        testHydraAttesterConfig.name,
        Network.Test,
        { sendOnChain: true }
      );
    }).rejects.toThrow();
  });
});
