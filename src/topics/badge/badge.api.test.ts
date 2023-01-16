import request from "supertest";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";

describe("test badges api - list network badges", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();

  beforeAll(() => api.ready());

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
    expect(response.body.items).toHaveLength(3);
    expect(response.body.items[0].collectionId).not.toBe("");
    expect(response.body.items[0].network).toBe("test");
    expect(response.body.items[0].networks).toEqual(["test"]);
    expect(response.body.items[0].attributes[0]).toEqual({
      trait_type: "PRIVACY",
      value: "Very High",
    });
    expect(response.body.items[0].isCurated).toEqual(true);
    expect(response.body.items[1].collectionId).not.toBe("");
    expect(response.body.items[1].network).toBe("test");
    expect(response.body.items[1].isCurated).toEqual(false);

    expect(response.body.items[2].networks).toEqual(["local", "test"])
  });
});

describe("test badges api - specific badge", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();
  
  beforeAll(() => api.ready());

  it("should return 404 for not existing badge", async () => {
    const response = await request(api.server).get(`/badges/test/123456.json`);
    expect(response.statusCode).toBe(404);
  });

  it("should return 404 for not existing badge (details/ route)", async () => {
    const response = await request(api.server).get(
      `/badges/test/details/123456`
    );
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
    expect(response.body.attributes[0]).toEqual({
      trait_type: "PRIVACY",
      value: "Very High",
    });
    expect(Object.keys(response.body)).not.toContain("requirements");
  });

  it("should return badge serialized (details/ route)", async () => {
    const response = await request(api.server).get(`/badges/test/details/1001`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(Object.keys(response.body)).not.toContain("requirements");
    const [badge] = response.body.items;
    expect(badge.name).toBe("Test Badge");
  });
});
