import { getFastify } from "./api.commands";
import { MemoryGroupStore } from "infrastructure/group-store";
import { groupGeneratorLibrary } from "topics/group-generator/test-group-generator";

describe("Test generate group command", () => {
  it("should generate groups and store them", async () => {
    const groupStore = new MemoryGroupStore();
    const api = getFastify({
      groupStore: groupStore,
      groupGeneratorLibrary: groupGeneratorLibrary,
      port: 8000,
    });

    expect(api.groupStore).toBe(groupStore);
    expect(api.groupGenerators).toBe(groupGeneratorLibrary);
  });
});
