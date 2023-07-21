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
    expect(response.body.items[0].iconUrl).toBe("/static/providers/testprovider.svg");
    expect(response.body.items[0].functions[0]).toHaveProperty("functionName");
  });

  it("Should get data providers count execution", async () => {
    const response = await request(api.server)
      .post(`/data-provider/TestProvider/getTestsCount`)
      .send({ inputs: [{ tests: 2 }] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(2 * 3);
  });

  it("Should check data providers args type", async () => {
    const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Local, {})
      .getApiService(false)
      .getApi();

    await api.ready();

    const response = await request(api.server).get(`/data-provider/interfaces`);
    if (response.statusCode !== 200) {
      console.log(response.body.message);
    }
    expect(response.statusCode).toBe(200);
  });
});
