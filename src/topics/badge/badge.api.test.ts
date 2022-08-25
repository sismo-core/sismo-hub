import request from "supertest";
import { ConfigurationDefault, ServiceFactory } from "service-factory";

describe("test badges api - list network badges", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefault.Test, {})
    .getApiService(false)
    .getApi();

  beforeAll(async () => {
    await api.ready();
  });

  it("should return bad request for invalid network name", async () => {
    const response = await request(api.server).get(`/badges/not-found/`);
    expect(response.statusCode).toBe(400);
  });

  it("should return empty list if no badge for this network", async () => {
    const response = await request(api.server).get(`/badges/mainnet/`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(0);
  });

  it("should return all badges for a network with collectionId and network", async () => {
    const response = await request(api.server).get(`/badges/test/`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.items[0].collectionId).not.toBe("");
    expect(response.body.items[0].network).toBe("test");
    expect(response.body.items[1].collectionId).not.toBe("");
    expect(response.body.items[1].network).toBe("test");
  });
});

describe("test badges api - specific badge", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefault.Test, {})
    .getApiService(false)
    .getApi();
  beforeAll(async () => {
    await api.ready();
  });

  it("should return 404 for not existing badge", async () => {
    const response = await request(api.server).get(`/badges/test/123456.json`);
    expect(response.statusCode).toBe(404);
  });

  it("should return 404 for existing badge in wrong network", async () => {
    const response = await request(api.server).get(
      `/badges/mainnet/00000000000000000000000000000000000000000000000000000000000003e9.json`
    );
    expect(response.statusCode).toBe(404);
  });

  it("should return badge serialized", async () => {
    const response = await request(api.server).get(
      `/badges/test/00000000000000000000000000000000000000000000000000000000000003e9.json`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Test Badge");
    expect(Object.keys(response.body)).not.toContain("requirements");
  });
});
