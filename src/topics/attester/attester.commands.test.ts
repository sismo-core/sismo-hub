import { computeAttester } from "./attester.commands";
import { attesterLibrary } from "./test-attester";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import { Network } from "topics/attester";

describe("Test attester commands", () => {
  it("should compute attester and get an available data", async () => {
    const availableDataStore = new MemoryAvailableDataStore();

    await computeAttester("test-attester", [Network.Test], {
      attesterLibrary: attesterLibrary,
      availableDataStore: availableDataStore,
      availableGroupStore: new MemoryFileStore(""),
      groupStore: new MemoryGroupStore(),
      sendOnChain: false,
    });
    const availableData = await availableDataStore.all();
    expect(availableData).toHaveLength(1);
  });
});
