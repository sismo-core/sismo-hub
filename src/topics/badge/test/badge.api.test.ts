import { BigNumber, ethers } from "ethers";
import request from "supertest";
import resetTestInfrastructure from "../../../infrastructure/test-infrastructure";
import { AttestationsCollection } from "../../attestations-collection";
import { Attester, AttesterNetwork } from "../../attester";
import { NetworksAttesters } from "../../attester/attester.helper.types";
import {
  setupMockAttester,
  setupMockEmptyAttester,
  unmockAttester,
} from "../../attester/test/test-attesters";
import { Badge } from "../badge";

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

describe("Test badges API", () => {
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

  describe("All network badges [GET /badges/:network]", () => {
    beforeEach(() => {
      unmockAttester();
    });

    it("Should return 404 when no badges are found on the network", async () => {
      await setupMockEmptyAttester();
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get("/badges/rinkeby");
      expect(response.statusCode).toBe(404);
      expect(response.body).toStrictEqual({
        error: "No badges found on this network",
      });
    });

    it("Should get all badges of the network", async () => {
      await setupMockAttester(mockAttester);
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get("/badges/rinkeby");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Network attester badge [GET /badges/:network/:badgeId]", () => {
    beforeEach(() => {
      unmockAttester();
    });

    it("Should return 404 when the network is not found", async () => {
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get("/badges/not-found/1");

      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({
        error: "Network not found",
      });
    });

    it("Should return 404 when the badge is not found for network", async () => {
      await setupMockAttester(mockAttester);
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get(
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
      await setupMockAttester(mockAttester);
      const app = (await require("../../../api/app")).default;

      const response = await request(app).get(
        `/badges/rinkeby/${ethers.utils
          .hexZeroPad(BigNumber.from(100).toHexString(), 32)
          .slice(2)}`
      );
      expect(response.statusCode).toBe(200);
    });
  });
});
