import SwaggerParser from "@apidevtools/swagger-parser";
import { getApi, getOpenApi } from "./api.commands";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import { attesterLibrary } from "topics/attester/test-attester";
import { groupGeneratorLibrary } from "topics/group-generator/test-group-generator";

describe("Test api command", () => {
  const availableDataStore = new MemoryAvailableDataStore();
  const availableGroupStore = new MemoryFileStore("available-groups");
  const groupStore = new MemoryGroupStore();
  const defaultsApiOptions = {
    attesterLibrary: attesterLibrary,
    availableDataStore: availableDataStore,
    availableGroupStore: availableGroupStore,
    groupStore: groupStore,
    groupGeneratorLibrary: groupGeneratorLibrary,
    port: 8000,
  };

  it("should generate api instance and have default properties", async () => {
    const api = getApi(defaultsApiOptions);

    expect(api.attesters).toBe(attesterLibrary);
    expect(api.availableDataStore).toBe(availableDataStore);
    expect(api.availableGroupStore).toBe(availableGroupStore);
    expect(api.groupStore).toBe(groupStore);
    expect(api.groupGenerators).toBe(groupGeneratorLibrary);
  });

  it("should create relative static url prefixed by static", async () => {
    const api = getApi(defaultsApiOptions);
    expect(api.staticUrl("test.png")).toBe("/static/test.png");
  });

  it("should create static url with specified url", async () => {
    const api = getApi({
      ...defaultsApiOptions,
      staticUrl: "https://static.sismo.io/data-sources/",
    });
    expect(api.staticUrl("test.png")).toBe(
      "https://static.sismo.io/data-sources/test.png"
    );
  });

  it("should get openapi and validate it", async () => {
    const openApi = await getOpenApi(defaultsApiOptions);
    expect(openApi.info.title.toLowerCase()).toContain("sismo");
    await SwaggerParser.validate(openApi);
  });
});
