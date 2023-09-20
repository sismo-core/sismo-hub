import SwaggerParser from "@apidevtools/swagger-parser";
import request from "supertest";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";

describe("Test api", () => {
  const service = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {}).getApiService(false);

  it("should create relative static url prefixed by static", async () => {
    const api = service.getApi();
    expect(api.staticUrl("test.png")).toBe("/static/test.png");
  });

  it("should create static url with specified url", async () => {
    const serviceWithStatic = ServiceFactory.withDefault(
      ConfigurationDefaultEnv.Test,
      {}
    ).getApiService(false, "https://static.sismo.io/data-sources/");
    const api = serviceWithStatic.getApi();
    expect(api.staticUrl("test.png")).toBe("https://static.sismo.io/data-sources/test.png");
  });

  it("should get openapi and validate it", async () => {
    const openApi = await service.getOpenApiSchema();
    expect(openApi.info.title.toLowerCase()).toContain("sismo");
    await SwaggerParser.validate(openApi);
  });

  it("should have default log", async () => {
    const serviceWithLog = ServiceFactory.withDefault(
      ConfigurationDefaultEnv.Test,
      {}
    ).getApiService();
    expect(serviceWithLog.log).toBe(true);
  });

  it("should redirect to rapidoc", async () => {
    const api = service.getApi();
    await api.ready();
    const response = await request(api.server).get("/rapidoc");
    expect(response.statusCode).toBe(302);
    expect(response.headers["location"]).toEqual(api.staticUrl("rapidoc/index.html"));
  });
});
