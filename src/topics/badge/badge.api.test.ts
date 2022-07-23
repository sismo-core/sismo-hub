import request from "supertest";
import hydraS1 from "../../../attesters/hydra-s1";
import app from "../../api/app";
import resetTestInfrastructure from "../../infrastructure/test-infrastructure";
import { AttestationsCollection } from "../attestations-collection";
import { Attester, AttesterNetwork } from "../attester";
import { NetworksAttesters } from "../attester/attester.helper";
import { Badge } from "./badge";

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
  const emptyExpectedNetworkAttesters: NetworksAttesters = {};
  let expectedNetworkAttesters: NetworksAttesters = {};

  beforeAll(async () => {
    await resetTestInfrastructure();

    for (const networkAttester in AttesterNetwork) {
      emptyExpectedNetworkAttesters[networkAttester.toLowerCase()] = {};
    }

    expectedNetworkAttesters = { ...emptyExpectedNetworkAttesters };

    expectedNetworkAttesters["polygon"] = expectedNetworkAttesters["rinkeby"] =
      { "attester-1": mockAttester };
  });

  describe("All network badges", () => {
    it("Should return 404 when no badges are found on the network", async () => {
      jest.resetAllMocks();
      const response = await request(app).get("/badges/rinkeby");
      expect(response.statusCode).toBe(404);
    });

    it("Should get all badges on the network", async () => {
      setupMockAttester();
      const response = await request(app).get("/badges/rinkeby");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Network attester badges", () => {
    it("Should return 404 when no badges are found on the network", async () => {
      jest.resetAllMocks();
      const response = await request(app).get("/badges/rinkeby/attester-1");
      expect(response.statusCode).toBe(404);
    });

    it("Should get all badges on the network", async () => {
      setupMockAttester();
      const response = await request(app).get("/badges/rinkeby/attester-1");
      expect(response.statusCode).toBe(200);
    });
  });
});
