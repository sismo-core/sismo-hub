import { HydraS1AvailableGroup } from "./available-group";
import { MerkleTreeHandler } from "./helpers";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import { AccountSource, Group, ValueType } from "topics/group";

const testGroup: Group = {
  name: "test-group",
  timestamp: 1,
  data: async () => ({
    "0x1": 1,
    "0x2": 1,
  }),
  resolvedIdentifierData: async (data = { "0x1": 1, "0x2": 1 }) => {
    return data;
  },
  accountSources: [AccountSource.ETHEREUM],
  tags: [],
  valueType: ValueType.Info,
};

describe("Test HydraS1 available group", () => {
  let availableGroup: HydraS1AvailableGroup;
  let fileStore: MemoryFileStore;
  let logger: MemoryLogger;

  beforeEach(async () => {
    fileStore = new MemoryFileStore("");
    logger = new MemoryLogger();
    availableGroup = new HydraS1AvailableGroup(
      fileStore,
      {
        group: testGroup,
        internalCollectionId: 0,
      },
      logger
    );
  });

  it("should create an available group and get correct properties and id", async () => {
    expect(availableGroup.properties.internalCollectionId).toBe(0);
    expect(availableGroup.properties.generationTimestamp).toBe(
      testGroup.timestamp
    );
    expect(availableGroup.properties.isScore).toBe(false);
    expect(availableGroup.groupId).toBe(
      "0x19ad9a600c5c070a445a086172bfd73e752e0d7ba85ec5edf6474585cfcdbd56"
    );
  });

  it("should generate an available data and verify data", async () => {
    const availableData = await availableGroup.compute();
    expect(availableData).toHaveLength(1);
    expect(await fileStore.readFromUrl(availableData[0].dataUrl)).toEqual({
      ...(await testGroup.resolvedIdentifierData()),
      [availableGroup.groupId]: "0",
    });
    expect(
      await fileStore.readFromUrl(availableData[0].metadata.groupDataUrl)
    ).toEqual({
      ...(await testGroup.resolvedIdentifierData()),
    });
    expect((await fileStore.readFromUrl(availableData[0].treeUrl)).root).toBe(
      availableData[0].root
    );
  });

  it("should not generate merkle tree if already exists", async () => {
    const merkleTree = new MerkleTreeHandler(new MemoryFileStore(""), {
      // we create the group directly here to prevent a different computing
      // when creating availableData
      // it resolves issues introduced by caching the merkle tree
      ...(await testGroup.resolvedIdentifierData()),
      [availableGroup.groupId]: "0",
    });
    await fileStore.write(merkleTree.treeFilename, {
      root: "fakeRoot",
    });
    const availableData = await availableGroup.compute();
    expect(availableData).toHaveLength(1);
    expect(availableData[0].root).toBe("fakeRoot");
    expect(await fileStore.readFromUrl(availableData[0].treeUrl)).toEqual({
      root: "fakeRoot",
    });
  });

  it("should not write data if already exists", async () => {
    const merkleTree = new MerkleTreeHandler(new MemoryFileStore(""), {
      // we create the group directly here to prevent a different computing
      // when creating availableData
      // it resolves issues introduced by caching the merkle tree
      ...(await testGroup.resolvedIdentifierData()),
      [availableGroup.groupId]: "0",
    });
    await fileStore.write(merkleTree.dataFilename, {
      "0x100": 100,
    });
    const availableData = await availableGroup.compute();
    expect(availableData).toHaveLength(1);
    expect(await fileStore.readFromUrl(availableData[0].dataUrl)).toEqual({
      "0x100": 100,
    });
  });

  it("should generate an available data with multiple chunks and verify data", async () => {
    const availableData = await availableGroup.compute(1);
    expect(availableData).toHaveLength(2);
    expect(availableData[0].chunk.chunkNumber).toBe(0);
    expect(availableData[1].chunk.chunkNumber).toBe(1);
  });
});
