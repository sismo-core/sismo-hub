import { FastifyInstance } from "fastify";
import "reflect-metadata";
import request from "supertest";
import { DependencyContainer } from "tsyringe";
import { getMemoryContainer } from "../../../infrastructure";
import {
  setupMockAttester,
  setupMockEmptyAttester,
  unmockAttester,
} from "./test-attesters";

let fastify: FastifyInstance;

async function setupFastify(container: DependencyContainer) {
  const getFastify = (await require("../../../api/app")).getFastify;

  fastify = getFastify(false, {}, container);
  await fastify.ready();
}

describe("Test attesters API", () => {
  let container: DependencyContainer;

  beforeAll(() => {
    container = getMemoryContainer();
  });

  beforeEach(async () => {
    container.clearInstances();
  });

  describe("All attesters [GET /attesters/]", () => {
    beforeEach(async () => {
      unmockAttester();
    });

    test("It should return 404 when no attesters are found", async () => {
      await setupMockEmptyAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get("/attesters");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "No attesters found",
      });
    });

    test("Should get all attesters", async () => {
      await setupMockAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get("/attesters");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Network attesters [GET /attesters/:network]", () => {
    beforeEach(() => {
      unmockAttester();
    });

    test("It should return 404 when not attesters are found", async () => {
      await setupMockEmptyAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get("/attesters/rinkeby");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "No attesters found on this network",
      });
    });

    test('It should return all attesters for the "rinkeby" network', async () => {
      await setupMockAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get("/attesters/rinkeby");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Network attester [GET /attesters/:network/:attester]", () => {
    beforeEach(() => {
      unmockAttester();
    });

    test("It should return 404 when the attester is not found", async () => {
      await setupMockEmptyAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get(
        "/attesters/rinkeby/attester-1"
      );
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "Attester not found",
      });
    });

    test("It should return the attester", async () => {
      await setupMockAttester();
      await setupFastify(container);

      const response = await request(fastify.server).get(
        "/attesters/rinkeby/attester-1"
      );
      expect(response.statusCode).toBe(200);
    });
  });
});
