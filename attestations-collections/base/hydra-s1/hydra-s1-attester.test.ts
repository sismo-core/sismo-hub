import { MemoryRootsRegistry } from "./infrastructure";
import { generateHydraS1Attester, RootsRegistryFactory } from ".";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { HydraS1NetworkConfiguration } from "@attestations-collections/base/hydra-s1/hydra-s1.types";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import {
  Attester,
  AttesterComputeContext,
  AttesterService,
  Network,
} from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { AccountSource, ValueType } from "topics/group";

export const testHydraAttesterNetworkConfiguration: HydraS1NetworkConfiguration =
  {
    attesterAddress: "0x1",
    rootsRegistryAddress: "0x2",
  };

export const testHydraAttesterConfig: Omit<
  Attester,
  | "sendOnChain"
  | "makeGroupsAvailable"
  | "removeOnChain"
  | "getGroupsAvailableDiff"
> = {
  name: "test-attester",
  network: Network.Test,
  groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.simpleEncoder,
  attestationsCollections: [
    {
      internalCollectionId: 0,
      groupFetcher: async () => [
        {
          name: "test-group",
          timestamp: 1,
          data: async () => ({ "0x1": 1, "0x2": 1 }),
          resolvedIdentifierData: async (data = { "0x1": 1, "0x2": 1 }) => {
            return data;
          },
          accountSources: [AccountSource.ETHEREUM],
          tags: [],
          valueType: ValueType.Info,
        },
        {
          name: "test-group",
          timestamp: 2,
          data: async () => ({ "0x3": 1, "0x4": 1 }),
          resolvedIdentifierData: async (data = { "0x3": 1, "0x4": 1 }) => {
            return data;
          },
          accountSources: [AccountSource.ETHEREUM],
          tags: [],
          valueType: ValueType.Info,
        },
      ],
    },
  ],
};

export const testHydraAttesterNetworkConfigurationTwo: HydraS1NetworkConfiguration =
  {
    attesterAddress: "0x10",
    rootsRegistryAddress: "0x20",
  };

export const testHydraAttesterConfigTwo: Omit<
  Attester,
  | "sendOnChain"
  | "makeGroupsAvailable"
  | "isOnChain"
  | "removeOnChain"
  | "getGroupsAvailableDiff"
> = {
  name: "test-attester-two",
  network: Network.Test,
  groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.simpleEncoder,
  attestationsCollections: [
    {
      internalCollectionId: 10,
      groupFetcher: async () => [
        {
          name: "test-group-two",
          timestamp: 1,
          data: async () => ({ "0x10": 1, "0x20": 1 }),
          resolvedIdentifierData: async (data = { "0x10": 1, "0x20": 1 }) => {
            return data;
          },
          accountSources: [AccountSource.ETHEREUM],
          tags: [],
          valueType: ValueType.Info,
        },
        {
          name: "test-group-two",
          timestamp: 2,
          data: async () => ({ "0x30": 1, "0x40": 1 }),
          resolvedIdentifierData: async (data = { "0x30": 1, "0x40": 1 }) => {
            return data;
          },
          accountSources: [AccountSource.ETHEREUM],
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
  let testGroupStore: MemoryGroupStore;
  let testLogger: MemoryLogger;
  let context: AttesterComputeContext;

  beforeEach(async () => {
    testAvailableDataStore = new MemoryAvailableDataStore();
    testAvailableGroupStore = new MemoryFileStore("");
    testGroupStore = new MemoryGroupStore();
    testRootsRegistry = new MemoryRootsRegistry();
    testLogger = new MemoryLogger();
    const getTestRegistry: RootsRegistryFactory = (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      computeContext: AttesterComputeContext
    ) => testRootsRegistry;
    attesterService = new AttesterService({
      attesters: {
        [Network.Test]: {
          [testHydraAttesterConfig.name]: generateHydraS1Attester(
            testHydraAttesterNetworkConfiguration,
            testHydraAttesterConfig,
            getTestRegistry
          ),
          [testHydraAttesterConfigTwo.name]: generateHydraS1Attester(
            testHydraAttesterNetworkConfigurationTwo,
            testHydraAttesterConfigTwo,
            getTestRegistry
          ),
        },
      },
      availableDataStore: testAvailableDataStore,
      availableGroupStore: testAvailableGroupStore,
      groupStore: testGroupStore,
      logger: testLogger,
    });
    context = {
      name: testHydraAttesterConfig.name,
      network: Network.Test,
      generationTimestamp: 1,
      groupStore: testGroupStore,
      availableDataStore: testAvailableDataStore,
      availableGroupStore: testAvailableGroupStore,
      logger: testLogger,
    };
  });

  it("Should revert for wrong network with attester", () => {
    expect(() => {
      attesterService.getAttester(
        testHydraAttesterConfigTwo.name,
        Network.Local
      );
    }).toThrow("Network not referenced or does not exists for the attester");
  });

  it("Should revert for wrong attester name", () => {
    const fakeAttesterName = "fake-name";
    expect(() => {
      attesterService.getAttester(fakeAttesterName, Network.Test);
    }).toThrow(`Attester "${fakeAttesterName}" does not exists`);
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
      testHydraAttesterConfigTwo.name,
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
    const availableData1 = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
        generationTimestamp: 123,
      }
    );
    // Update Group fetcher to have different root
    testHydraAttesterConfig.attestationsCollections[0].groupFetcher =
      async () => [
        {
          name: "other-group",
          timestamp: 1,
          data: async () => ({ "0x1": 2, "0x2": 2 }),
          resolvedIdentifierData: async (data = { "0x1": 2, "0x2": 2 }) => {
            return data;
          },
          accountSources: [AccountSource.ETHEREUM],
          tags: [],
          valueType: ValueType.Info,
        },
      ];
    const availableData2 = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
        generationTimestamp: 124,
      }
    );

    const attester = attesterService.getAttester(
      testHydraAttesterConfig.name,
      Network.Test
    );

    const diff = await attester.getGroupsAvailableDiff(
      availableData1.identifier,
      availableData2.identifier,
      context
    );
    expect(diff)
      .toEqual(`~ Modified Group (test-group) for internalCollectionId 0
  GroupId: 0x143ffc5bff256fc7e131b34c892521c7f12c941b9562b32f4609b3fa7ec7d5c0 -> 0x19ad9a600c5c070a445a086172bfd73e752e0d7ba85ec5edf6474585cfcdbd56
  Timestamp: 1970-01-01T00:00:02.000Z -> 1970-01-01T00:00:01.000Z
  Accounts: 6 -> 3
`);
    expect(testRootsRegistry.registry.size).toBe(1);
    expect(
      await testRootsRegistry.isAvailable(availableData2.identifier)
    ).toBeTruthy();
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
      groupFetcher: async () => [
        {
          name: "test-group",
          timestamp: 1,
          data: async () => ({ "0x1": 1, "0x2": 1 }),
          resolvedIdentifierData: async (data = { "0x1": 1, "0x2": 1 }) => {
            return data;
          },
          accountSources: [AccountSource.ETHEREUM],
          tags: [],
          valueType: ValueType.Info,
        },
      ],
    });
    const availableData2 = await attesterService.compute(
      testHydraAttesterConfig.name,
      Network.Test,
      {
        sendOnChain: true,
        dryRun: true,
      }
    );

    const attester = attesterService.getAttester(
      testHydraAttesterConfig.name,
      Network.Test
    );

    const diff = await attester.getGroupsAvailableDiff(
      availableData1.identifier,
      availableData2.identifier,
      context
    );
    expect(diff).toEqual(`+ New Group (test-group) for internalCollectionId 1
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
    const attester = attesterService.getAttester(
      testHydraAttesterConfig.name,
      Network.Test
    );

    const diff = await attester.getGroupsAvailableDiff(
      availableData1.identifier,
      availableData2.identifier,
      context
    );
    expect(diff)
      .toEqual(`- Delete Group (other-group) for internalCollectionId 0
  GroupId: 0x19ad9a600c5c070a445a086172bfd73e752e0d7ba85ec5edf6474585cfcdbd56
  Timestamp: 1970-01-01T00:00:01.000Z
  Accounts: 3
`);
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
});
