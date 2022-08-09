import { FastifyInstance } from "fastify";
import request from "supertest";
import { createFastifyWithDefaults, ApiConfigurationDefault } from "api";
import { Network } from "topics/attester";

describe("test badges api - global badges", () => {
  const fastify: FastifyInstance = createFastifyWithDefaults(
    ApiConfigurationDefault.Test
  );

  beforeAll(async () => {
    await fastify.ready();
  });

  it("should have all networks", async () => {
    const response = await request(fastify.server).get(`/badges/`);
    expect(response.statusCode).toBe(200);
    const expectedNetworks = Object.values(Network);
    const networks = Object.keys(response.body.items);
    expect(networks).toHaveLength(expectedNetworks.length);
    for (const network of expectedNetworks) {
      expect(networks).toContain(network);
    }
  });

  it("should have correct badges in networks", async () => {
    const response = await request(fastify.server).get(`/badges/`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items["polygon"]).toHaveLength(2);
    expect(response.body.items["mainnet"]).toHaveLength(0);
  });
});

describe("test badges api - network list badges", () => {
  const fastify: FastifyInstance = createFastifyWithDefaults(
    ApiConfigurationDefault.Test
  );

  beforeAll(async () => {
    await fastify.ready();
  });

  it("should return empty list for invalid network name", async () => {
    const response = await request(fastify.server).get(`/badges/not-found/`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(0);
  });

  it("should return empty list if no badge for this network", async () => {
    const response = await request(fastify.server).get(`/badges/mainnet/`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(0);
  });

  it("should return all badges for a network with collectionId and network", async () => {
    const response = await request(fastify.server).get(`/badges/polygon/`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.items[0].collectionId).not.toBe("");
    expect(response.body.items[0].network).toBe("polygon");
    expect(response.body.items[1].collectionId).not.toBe("");
    expect(response.body.items[1].network).toBe("polygon");
  });
});

describe("test badges api - specific badge", () => {
  const fastify: FastifyInstance = createFastifyWithDefaults(
    ApiConfigurationDefault.Test
  );

  beforeAll(async () => {
    await fastify.ready();
  });

  it("should return 404 for not existing badge", async () => {
    const response = await request(fastify.server).get(
      `/badges/polygon/123456.json`
    );
    expect(response.statusCode).toBe(404);
  });

  it("should return 404 for existing badge in wrong network", async () => {
    const response = await request(fastify.server).get(
      `/badges/mainnet/00000000000000000000000000000000000000000000000000000000000003e9.json`
    );
    expect(response.statusCode).toBe(404);
  });

  it("should return badge serialized", async () => {
    const response = await request(fastify.server).get(
      `/badges/polygon/00000000000000000000000000000000000000000000000000000000000003e9.json`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Test Badge");
    expect(Object.keys(response.body)).not.toContain("requirements");
  });
});
