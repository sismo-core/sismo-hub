import { getFastify } from "./api.commands";
import { MemoryGroupStore } from "infrastructure/group-store";
import { attesterLibrary } from "topics/attester/test-attester";
import { groupGeneratorLibrary } from "topics/group-generator/test-group-generator";

describe("Test api command", () => {
  const groupStore = new MemoryGroupStore();
  const defaultsApiOptions = {
    attesterLibrary: attesterLibrary,
    groupStore: groupStore,
    groupGeneratorLibrary: groupGeneratorLibrary,
    port: 8000,
  };

  it("should generate api instance and have default properties", async () => {
    const api = getFastify(defaultsApiOptions);

    expect(api.attesters).toBe(attesterLibrary);
    expect(api.groupStore).toBe(groupStore);
    expect(api.groupGenerators).toBe(groupGeneratorLibrary);
  });

  it("should create relative static url prefixed by static", async () => {
    const api = getFastify(defaultsApiOptions);
    expect(api.staticUrl("test.png")).toBe("/static/test.png");
  });

  it("should create static url with specified url", async () => {
    const api = getFastify({
      ...defaultsApiOptions,
      staticUrl: "https://static.sismo.io/data-sources/",
    });
    expect(api.staticUrl("test.png")).toBe(
      "https://static.sismo.io/data-sources/test.png"
    );
  });
});
