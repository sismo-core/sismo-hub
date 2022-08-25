import SwaggerParser from "@apidevtools/swagger-parser";
import { MemoryAvailableDataStore } from "infrastructure/available-data";
import { MemoryFileStore } from "infrastructure/file-store";
import { MemoryGroupStore } from "infrastructure/group-store";
import { ConfigurationDefault, ServiceFactory } from "service-factory";
import { AttesterService } from "topics/attester";
import { testAttesters } from "topics/attester/test-attester";
import { GroupGeneratorService } from "topics/group-generator";
import { groupGenerators } from "topics/group-generator/test-group-generator";

describe("Test api", () => {
  const service = ServiceFactory.withDefault(
    ConfigurationDefault.Test,
    {}
  ).getApiService(false);

  it("should generate api instance and have test defaults", async () => {
    const api = service.getApi();

    expect(api.attesters).toBeInstanceOf(AttesterService);
    expect(api.attesters.attesters).toBe(testAttesters);
    expect(api.availableDataStore).toBeInstanceOf(MemoryAvailableDataStore);
    expect(api.availableGroupStore).toBeInstanceOf(MemoryFileStore);
    expect(api.groupGenerators).toBeInstanceOf(GroupGeneratorService);
    expect(api.groupGenerators.generators).toBe(groupGenerators);
    expect(api.groupStore).toBeInstanceOf(MemoryGroupStore);
  });

  it("should create relative static url prefixed by static", async () => {
    const api = service.getApi();
    expect(api.staticUrl("test.png")).toBe("/static/test.png");
  });

  it("should create static url with specified url", async () => {
    const serviceWithStatic = ServiceFactory.withDefault(
      ConfigurationDefault.Test,
      {}
    ).getApiService(false, "https://static.sismo.io/data-sources/");
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

  it("should have default log", async () => {
    const serviceWithLog = ServiceFactory.withDefault(
      ConfigurationDefault.Test,
      {}
    ).getApiService();
    expect(serviceWithLog.log).toBe(true);
  });
});
