import SwaggerParser from "@apidevtools/swagger-parser";
import { ApiConfigurationDefault, ApiService } from "./api";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import { testAttesters } from "topics/attester/test-attester";
import { groupGenerators } from "topics/group-generator/test-group-generator";

describe("Test api", () => {
  const service = ApiService.fromDefault(ApiConfigurationDefault.Test);

  it("should generate api instance and have test defaults", async () => {
    const api = service.getApi();

    expect(api.attesters).toBe(testAttesters);
    expect(api.availableDataStore).toBeInstanceOf(MemoryAvailableDataStore);
    expect(api.availableGroupStore).toBeInstanceOf(MemoryFileStore);
    expect(api.groupGenerators).toBe(groupGenerators);
    expect(api.groupStore).toBeInstanceOf(MemoryGroupStore);
  });

  it("should create relative static url prefixed by static", async () => {
    const api = service.getApi();
    expect(api.staticUrl("test.png")).toBe("/static/test.png");
  });

  it("should create static url with specified url", async () => {
    const serviceWithStatic = ApiService.fromDefault(
      ApiConfigurationDefault.Test,
      { staticPrefix: "https://static.sismo.io/data-sources/" }
    );
    const api = serviceWithStatic.getApi();
    expect(api.staticUrl("test.png")).toBe(
      "https://static.sismo.io/data-sources/test.png"
    );
  });

  it("should get openapi and validate it", async () => {
    const openApi = await service.getOpenApiSchema();
    expect(openApi.info.title.toLowerCase()).toContain("sismo");
    await SwaggerParser.validate(openApi);
  });
});
