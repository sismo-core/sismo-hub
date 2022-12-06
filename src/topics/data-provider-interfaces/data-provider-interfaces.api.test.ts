import request from "supertest";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";

describe("test data providers api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();

  beforeAll(async () => {
    await api.ready();
  });

  it("Should get data providers", async () => {
    const response = await request(api.server).get(`/data-provider-interfaces`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items[0].name).toBe("Github");
    expect(response.body.items[0].functions[0]).toHaveProperty("functionName");
    expect(response.body.items[1].name).not.toBe("");
    expect(response.body.items[1].functions).toHaveLength(1);
  });
});
