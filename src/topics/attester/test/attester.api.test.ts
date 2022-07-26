import request from "supertest";
import resetTestInfrastructure from "../../../infrastructure/test-infrastructure";
import { AttestationsCollection } from "../../attestations-collection";
import { Badge } from "../../badge";
import { Attester } from "../attester";
import {
  setupMockAttester,
  setupMockEmptyAttester,
  unmockAttester,
} from "./test-attesters";

const mockAttester = new Attester({
  name: "attester-1",
  configurations: {
    rinkeby: {
      address: "",
      firstCollectionId: 100,
    },
    polygon: {
      address: "",
      firstCollectionId: 100,
    },
  },
  attestationsCollections: [
    new AttestationsCollection({
      groupsFetcher: async () => [],
      badge: new Badge({
        name: "ZK Badge: Test Badge",
        description: "ZK Badge received by testers",
        image: "./badges/badge_digger.svg",
        requirements: [],
      }),
    }),
  ],
});

describe("Test attesters API", () => {
  beforeAll(async () => {
    await resetTestInfrastructure();
  });

  describe("All attesters [GET /attesters/]", () => {
    beforeEach(() => {
      unmockAttester();
    });

    test("It should return 404 when no attesters are found", async () => {
      await setupMockEmptyAttester();
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get("/attesters");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "No attesters found",
      });
    });

    test("Should get all attesters", async () => {
      await setupMockAttester(mockAttester);
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get("/attesters");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Network attesters [GET /attesters/:network]", () => {
    beforeEach(() => {
      unmockAttester();
    });

    test("It should return 404 when not attesters are found", async () => {
      await setupMockEmptyAttester();
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get("/attesters/rinkeby");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "No attesters found on this network",
      });
    });

    test('It should return all attesters for the "rinkeby" network', async () => {
      await setupMockAttester(mockAttester);
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get("/attesters/rinkeby");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Network attester [GET /attesters/:network/:attester]", () => {
    beforeEach(() => {
      unmockAttester();
    });

    test("It should return 404 when the attester is not found", async () => {
      await setupMockEmptyAttester();
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get("/attesters/rinkeby/attester-1");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "Attester not found",
      });
    });

    test("It should return the attester", async () => {
      await setupMockAttester(mockAttester);
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get("/attesters/rinkeby/attester-1");
      expect(response.statusCode).toBe(200);
    });
  });
});
