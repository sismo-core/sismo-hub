import request from "supertest";
import { createApiWithDefaults, ApiConfigurationDefault } from "api";

describe("test badges api - list network badges", () => {
  const api = createApiWithDefaults(ApiConfigurationDefault.Test);

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
    const response = await request(api.server).get(`/badges/polygon/`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.items[0].collectionId).not.toBe("");
    expect(response.body.items[0].network).toBe("polygon");
    expect(response.body.items[1].collectionId).not.toBe("");
    expect(response.body.items[1].network).toBe("polygon");
  });
});

describe("test badges api - specific badge", () => {
  const api = createApiWithDefaults(ApiConfigurationDefault.Test);

  beforeAll(async () => {
    await api.ready();
  });

  it("should return 404 for not existing badge", async () => {
    const response = await request(api.server).get(
      `/badges/polygon/123456.json`
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
      `/badges/polygon/00000000000000000000000000000000000000000000000000000000000003e9.json`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Test Badge");
    expect(Object.keys(response.body)).not.toContain("requirements");
  });
});
