import { BigNumber, ethers } from "ethers";
import { FastifyInstance } from "fastify";
import "reflect-metadata";
import request from "supertest";
import { getFastify } from "../../api/app";
import { getMemoryContainer } from "../../infrastructure";
import MockAttester1 from "../attester/test-attesters";

let fastify: FastifyInstance;

async function setupEmptyLibraryAttester() {
  const container = getMemoryContainer();
  fastify = getFastify(false, {}, container);
  await fastify.ready();
}

async function setupLibraryAttester() {
  const container = getMemoryContainer();
  fastify = getFastify(
    false,
    { attesters: { "mock-attester-1": container.resolve(MockAttester1) } },
    container
  );
  await fastify.ready();
}

describe("Test badges API", () => {
  describe("All network badges [GET /badges/:network/badges.json]", () => {
    it("Should return 404 when no badges are found on the network", async () => {
      await setupEmptyLibraryAttester();

      const response = await request(fastify.server).get(
        "/badges/rinkeby/badges.json"
      );
      expect(response.statusCode).toBe(404);
      expect(response.body).toStrictEqual({
        error: "No badges found on this network",
      });
    });

    it("Should get all badges of the network", async () => {
      await setupLibraryAttester();

      const response = await request(fastify.server).get(
        "/badges/rinkeby/badges.json"
      );
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Network attester badge [GET /badges/:network/:badgeId.json]", () => {
    it("Should return 404 when the network is not found", async () => {
      const response = await request(fastify.server).get(
        "/badges/not-found/1.json"
      );

      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({
        error: "Badge not found on this network",
      });
    });

    it("Should return 404 when the badge is not found for network", async () => {
      await setupEmptyLibraryAttester();

      const response = await request(fastify.server).get(
        `/badges/rinkeby/${ethers.utils
          .hexZeroPad(BigNumber.from(10).toHexString(), 32)
          .slice(2)}.json`
      );
      expect(response.statusCode).toBe(404);
      expect(response.body).toStrictEqual({
        error: "Badge not found on this network",
      });
    });

    it("Should return the badge from the rinkeby network", async () => {
      await setupLibraryAttester();

      const response = await request(fastify.server).get(
        `/badges/rinkeby/${ethers.utils
          .hexZeroPad(BigNumber.from(100).toHexString(), 32)
          .slice(2)}.json`
      );
      expect(response.statusCode).toBe(200);
    });
  });
});
