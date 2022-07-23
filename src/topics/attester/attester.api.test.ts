import request from "supertest";
import hydraS1 from "../../../attesters/hydra-s1";
import app from "../../api/app";
import resetTestInfrastructure from "../../infrastructure/test-infrastructure";
import { AttestationsCollection } from "../attestations-collection";
import { Badge } from "../badge";
import { Attester } from "./attester";

jest.mock("../../../attesters/hydra-s1", () => {
  return jest.fn((): Promise<any> => {
    return Promise.resolve();
  });
});

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
      groups: [],
      badge: new Badge({
        name: "ZK Badge: Test Badge",
        description: "ZK Badge received by testers",
        image: "./badges/badge_digger.svg",
        requirements: [],
      }),
    }),
  ],
});

function setupMockAttester() {
  (hydraS1 as jest.Mock).mockReturnValue(Promise.resolve(mockAttester));
}

describe("Test attester API", () => {
  beforeAll(async () => {
    await resetTestInfrastructure();
  });

  describe("All attesters", () => {
    test("It should return 404 when no attesters are found", async () => {
      jest.resetAllMocks();
      const response = await request(app).get("/attesters");
      expect(response.statusCode).toBe(404);
    });

    test("Should get all attesters", async () => {
      setupMockAttester();

      const response = await request(app).get("/attesters");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Network attesters", () => {
    test("It should return 404 when not attesters are found", async () => {
      jest.resetAllMocks();

      const response = await request(app).get("/attesters/rinkeby");
      expect(response.statusCode).toBe(404);
    });

    test('It should return all attesters for the "rinkeby" network', async () => {
      setupMockAttester();

      const response = await request(app).get("/attesters/rinkeby");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Attester", () => {
    test("It should return 404 when the attester is not found", async () => {
      jest.resetAllMocks();

      const response = await request(app).get("/attesters/rinkeby/attester-1");
      expect(response.statusCode).toBe(404);
    });

    test("It should return the attester", async () => {
      setupMockAttester();

      const response = await request(app).get("/attesters/rinkeby/attester-1");
      expect(response.statusCode).toBe(200);
    });
  });
});
