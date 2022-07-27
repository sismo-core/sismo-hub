import { BigNumber, ethers } from "ethers";
import { FastifyInstance } from "fastify";
import "reflect-metadata";
import request from "supertest";
import { DependencyContainer } from "tsyringe";
import { getMemoryContainer } from "../../../infrastructure";
import {
  setupMockAttester,
  setupMockEmptyAttester,
  unmockAttester,
} from "../../attester/test/test-attesters";

let fastify: FastifyInstance;

async function setupFastify(container: DependencyContainer) {
  const getFastify = (await require("../../../api/app")).getFastify;

  fastify = getFastify(false, {}, container);
  await fastify.ready();
}

describe("Test badges API", () => {
  let container: DependencyContainer;

  beforeAll(() => {
    container = getMemoryContainer();
  });

  beforeEach(async () => {
    container.clearInstances();
  });

  describe("All network badges [GET /badges/:network]", () => {
    beforeEach(() => {
      unmockAttester();
    });

    it("Should return 404 when no badges are found on the network", async () => {
      await setupMockEmptyAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get("/badges/rinkeby");
      expect(response.statusCode).toBe(404);
      expect(response.body).toStrictEqual({
        error: "No badges found on this network",
      });
    });

    it("Should get all badges of the network", async () => {
      await setupMockAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get("/badges/rinkeby");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Network attester badge [GET /badges/:network/:badgeId]", () => {
    beforeEach(() => {
      unmockAttester();
    });

    it("Should return 404 when the network is not found", async () => {
      await setupFastify(container);

      const response = await request(fastify.server).get("/badges/not-found/1");

      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({
        error: "Network not found",
      });
    });

    it("Should return 404 when the badge is not found for network", async () => {
      await setupMockAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get(
        `/badges/rinkeby/${ethers.utils
          .hexZeroPad(BigNumber.from(10).toHexString(), 32)
          .slice(2)}`
      );
      expect(response.statusCode).toBe(404);
      expect(response.body).toStrictEqual({
        error: "Badge not found on this network",
      });
    });

    it("Should return the badge from the rinkeby network", async () => {
      await setupMockAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get(
        `/badges/rinkeby/${ethers.utils
          .hexZeroPad(BigNumber.from(100).toHexString(), 32)
          .slice(2)}`
      );
      expect(response.statusCode).toBe(200);
    });
  });
});
