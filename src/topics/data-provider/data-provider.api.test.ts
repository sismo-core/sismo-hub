import request from "supertest";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";

describe("test data providers api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();

  beforeAll(async () => {
    await api.ready();
  });

  it("Should get data providers (old route)", async () => {
    const response = await request(api.server).get(`/data-provider-interfaces`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items[0].name).toBe("Test");
    expect(response.body.items[0].functions[0]).toHaveProperty("functionName");
  });

  it("Should get data providers", async () => {
    const response = await request(api.server).get(`/data-provider/interfaces`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items[0].name).toBe("Test");
    expect(response.body.items[0].functions[0]).toHaveProperty("functionName");
  });

  it("Should get data providers count execution", async () => {
    const response = await request(api.server)
      .post(`/data-provider/TestProvider/getTestsCount`)
      .send({ inputs: [{ tests: 2 }] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(2 * 3);
  });
});
