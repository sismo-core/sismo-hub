import { LocalAvailableDataStore, MemoryAvailableDataStore } from ".";
import { AvailableDataStore } from "topics/available-data";
import { testAvailableData } from "topics/available-data/test-available-data";
import { Network } from "topics/registry-tree";

describe("test available data", () => {
  const memoryStore = new MemoryAvailableDataStore();
  const localStore = new LocalAvailableDataStore(`${__dirname}/../../../test-disk-store/unit`);

  const testCases: [AvailableDataStore[], AvailableDataStore[]] = [[memoryStore], [localStore]];

  beforeEach(async () => {
    await localStore.reset();
    await memoryStore.reset();
  });

  it.each(testCases)("Should generate an available data and retrieve from store", async (store) => {
    await store.save(testAvailableData.attester1_0);
    const availableData = await store.all();
    expect(availableData).toHaveLength(1);
    expect(availableData[0]).toEqual(testAvailableData.attester1_0);
  });

  it.each(testCases)(
    "Should generate multiple available data and retrieve them from store",
    async (store) => {
      await store.save(testAvailableData.attester1_0);
      await store.save(testAvailableData.attester1_1);
      const availableData = await store.all();

      expect(availableData).toHaveLength(2);
      expect(availableData[0]).toEqual(testAvailableData.attester1_0);
      expect(availableData[1]).toEqual(testAvailableData.attester1_1);
    }
  );

  it.each(testCases)(
    "Should generate multiple available data and search by name",
    async (store) => {
      await store.save(testAvailableData.attester1_0);
      await store.save(testAvailableData.attester1_1);
      await store.save(testAvailableData.attester2_0);

      const attester1 = await store.search({
        registryTreeName: testAvailableData.attester1_0.registryTreeName,
        network: Network.Test,
      });
      expect(attester1).toHaveLength(2);
      expect(attester1).toContainEqual(testAvailableData.attester1_0);
      expect(attester1).toContainEqual(testAvailableData.attester1_1);
    }
  );

  it.each(testCases)(
    "Should generate multiple available data and search by name and latest",
    async (store) => {
      await store.save(testAvailableData.attester1_0);
      await store.save(testAvailableData.attester1_1);
      await store.save(testAvailableData.attester2_0);

      const latest1 = await store.search({
        registryTreeName: testAvailableData.attester1_0.registryTreeName,
        network: Network.Test,
        latest: true,
      });
      expect(latest1[0]).toEqual(testAvailableData.attester1_1);

      const latest2 = await store.search({
        registryTreeName: testAvailableData.attester2_0.registryTreeName,
        network: Network.Test,
        latest: true,
      });
      expect(latest2[0]).toEqual(testAvailableData.attester2_0);
    }
  );

  it.each(testCases)(
    "Should generate multiple available data and search by is on chain",
    async (store) => {
      await store.save(testAvailableData.attester1_0);
      await store.save(testAvailableData.attester1_1);
      await store.save(testAvailableData.attester1_2);
      await store.save(testAvailableData.attester2_0);

      const onChainAvailableData = await store.search({
        registryTreeName: testAvailableData.attester1_0.registryTreeName,
        network: Network.Test,
        isOnChain: true,
      });

      expect(onChainAvailableData).toHaveLength(1);
      expect(onChainAvailableData[0].transactionHash).toEqual("0x1000");

      const notOnChainAvailableData = await store.search({
        registryTreeName: testAvailableData.attester1_0.registryTreeName,
        network: Network.Test,
        isOnChain: false,
      });
      expect(notOnChainAvailableData).toHaveLength(1);
      expect(notOnChainAvailableData[0].identifier).toEqual("0x11");
    }
  );

  it.each(testCases)("Should search latest in empty store and get empty array", async (store) => {
    const availableData = await store.search({
      registryTreeName: testAvailableData.attester1_0.registryTreeName,
      network: Network.Test,
      latest: true,
    });
    expect(availableData).toHaveLength(0);
  });

  it.each(testCases)("Should be unique by attester / network / timestamp", async (store) => {
    await store.save(testAvailableData.attester1_0);
    await store.save({
      ...testAvailableData.attester1_0,
      isOnChain: false,
    });
    const availableData = await store.all();
    expect(availableData).toHaveLength(1);
    expect(availableData[0].isOnChain).toBe(false);

    await store.save({
      ...testAvailableData.attester1_0,
      network: Network.Local,
    });
    expect(await store.all()).toHaveLength(2);

    await store.save({
      ...testAvailableData.attester1_0,
      registryTreeName: "new-attester",
    });
    expect(await store.all()).toHaveLength(3);
  });
});
