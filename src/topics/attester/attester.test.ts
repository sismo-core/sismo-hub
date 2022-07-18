import { BigNumber, ethers } from "ethers";
import hydraS1Simple from "../../../attesters/hydra-s1-simple";
import resetTestInfrastructure from "../../infrastructure/test-infrastructure";
import { AttestationsCollection } from "../attestations-collection";
import { Badge } from "../badge";
import { Attester } from "./attester";
import {
  AllConstructedAttesters,
  getConstructedAttesters,
  getConstructedNetworkAttesters,
} from "./attester.helper";
import { AttesterNetwork } from "./types";

jest.mock("../../../attesters/hydra-s1-simple", () => {
  return jest.fn((): Promise<any> => {
    return Promise.resolve();
  });
});

function setupMockAttester() {
  (hydraS1Simple as jest.Mock).mockReturnValue(
    Promise.resolve(
      new Attester({
        name: "attester-1",
        defaultCurrentTargetNetwork: "rinkeby" as AttesterNetwork,
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
      })
    )
  );
}

describe("Test attesters", () => {
  const emptyExpectedNetworkAttesters: AllConstructedAttesters = {};
  let expectedAttesters: AllConstructedAttesters = {};

  beforeAll(async () => {
    await resetTestInfrastructure();

    for (const networkAttester in AttesterNetwork) {
      emptyExpectedNetworkAttesters[networkAttester.toLowerCase()] = {};
    }

    expectedAttesters = { ...emptyExpectedNetworkAttesters };

    expectedAttesters["rinkeby"] = {
      "attester-1": {
        name: "attester-1",
        configuration: {
          address: "",
          firstCollectionId: 100,
        },
        attestationsCollections: [
          {
            badge: {
              collectionId: ethers.utils
                .hexZeroPad(BigNumber.from(100).toHexString(), 32)
                .slice(2),
              metadata: {
                name: "ZK Badge: Test Badge",
                description: "ZK Badge received by testers",
                image: "./badges/badge_digger.svg",
                requirements: [],
              },
            },
          },
        ],
      },
    };
    expectedAttesters["polygon"] = expectedAttesters["rinkeby"];
  });

  describe("getConstructedAttesters", () => {
    test("It should return empty networks when no attester was found", async () => {
      const attesters = await getConstructedAttesters();

      expect(attesters).toEqual(emptyExpectedNetworkAttesters);
    });

    test("It should return all constructed attesters for all networks", async () => {
      setupMockAttester();

      const allAttesters = await getConstructedAttesters();

      expect(allAttesters).toMatchObject(expectedAttesters);
    });
  });

  describe("getConstructedNetworkAttesters", () => {
    it("Should return empty when the network was not found", async () => {
      const attesters = await getConstructedNetworkAttesters(
        "test" as AttesterNetwork
      );

      expect(attesters).toEqual({});
    });

    test("It should return empty when no attester was found", async () => {
      jest.resetAllMocks();

      const attesters = await getConstructedNetworkAttesters(
        AttesterNetwork.Rinkeby
      );

      expect(attesters).toEqual(emptyExpectedNetworkAttesters["rinkeby"]);
    });

    test("It should return all attesters of the current network", async () => {
      setupMockAttester();

      const attesters = await getConstructedNetworkAttesters(
        AttesterNetwork.Rinkeby
      );

      expect(attesters).toMatchObject(expectedAttesters["rinkeby"]);

      expect(attesters).toMatchObject(expectedAttesters["polygon"]);
    });
  });

  describe("getConstructNetworkAttester", () => {
    it("Should return empty when the network was not found", async () => {
      const attesters = await getConstructedNetworkAttesters(
        "test" as AttesterNetwork
      );

      expect(attesters).toEqual({});
    });

    test("It should return empty when no attester was found", async () => {
      jest.resetAllMocks();

      const attesters = await getConstructedNetworkAttesters(
        AttesterNetwork.Rinkeby
      );

      expect(attesters).toEqual(emptyExpectedNetworkAttesters["rinkeby"]);
    });

    test("It should return all attesters of the current network", async () => {
      setupMockAttester();

      const attesters = await getConstructedNetworkAttesters(
        AttesterNetwork.Rinkeby
      );

      expect(attesters).toMatchObject(expectedAttesters["rinkeby"]);
      expect(attesters).toMatchObject(expectedAttesters["polygon"]);
    });
  });
});
