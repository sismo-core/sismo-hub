import { getFastify } from "./api.commands";
import { MemoryGroupStore } from "infrastructure/group-store";
import { attesterLibrary } from "topics/attester/test-attester";
import { groupGeneratorLibrary } from "topics/group-generator/test-group-generator";

describe("Test generate group command", () => {
  it("should generate groups and store them", async () => {
    const groupStore = new MemoryGroupStore();
    const api = getFastify({
      attesterLibrary: attesterLibrary,
      groupStore: groupStore,
      groupGeneratorLibrary: groupGeneratorLibrary,
      port: 8000,
    });

    expect(api.attesters).toBe(attesterLibrary);
    expect(api.groupStore).toBe(groupStore);
    expect(api.groupGenerators).toBe(groupGeneratorLibrary);
  });
});
