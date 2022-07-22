import hydraS1Simple from "../../../attesters/hydra-s1";
import resetTestInfrastructure from "../../infrastructure/test-infrastructure";
import { AttestationsCollection } from "../attestations-collection";
import { Badge } from "../badge";
import { Attester } from "./attester";
import {
  getNetworkAttester,
  getNetworkAttesters,
  getNetworksAttesters,
  NetworksAttesters,
} from "./attester.helper";
import { AttesterNetwork } from "./attester.types";

jest.mock("../../../attesters/hydra-s1", () => {
  return jest.fn((): Promise<any> => {
    return Promise.resolve();
  });
});

const mockAttester = new Attester({
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
});

function setupMockAttester() {
  (hydraS1Simple as jest.Mock).mockReturnValue(Promise.resolve(mockAttester));
}

describe("Test attesters helpers", () => {
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

  describe("getNetworksAttesters", () => {
    test("It should return empty networks when no attester was found", async () => {
      const attesters = await getNetworksAttesters();

      expect(attesters).toEqual(emptyExpectedNetworkAttesters);
    });

    test("It should return all constructed attesters for all networks", async () => {
      setupMockAttester();

      const allAttesters = await getNetworksAttesters();

      expect(allAttesters).toMatchObject(expectedNetworkAttesters);
    });
  });

  describe("getNetworkAttesters", () => {
    it("Should return empty when the network was not found", async () => {
      const attesters = await getNetworkAttesters("test" as AttesterNetwork);

      expect(attesters).toEqual({});
    });

    test("It should return empty when no attester was found", async () => {
      jest.resetAllMocks();

      const attesters = await getNetworkAttesters(AttesterNetwork.Rinkeby);

      expect(attesters).toEqual(emptyExpectedNetworkAttesters["rinkeby"]);
    });

    test("It should return all attesters of the current network", async () => {
      setupMockAttester();

      const attesters = await getNetworkAttesters(AttesterNetwork.Rinkeby);

      expect(attesters).toMatchObject(expectedNetworkAttesters["rinkeby"]);

      expect(attesters).toMatchObject(expectedNetworkAttesters["polygon"]);
    });
  });

  describe("getNetworkAttester", () => {
    it("Should return empty when the network was not found", async () => {
      const attesters = await getNetworkAttester(
        "test" as AttesterNetwork,
        "test"
      );

      expect(attesters).toEqual({});
    });

    test("It should return empty when the attester was found", async () => {
      jest.resetAllMocks();

      const attesters = await getNetworkAttester(
        AttesterNetwork.Rinkeby,
        "test"
      );

      expect(attesters).toEqual(emptyExpectedNetworkAttesters["rinkeby"]);
    });

    test("It should return the attester", async () => {
      setupMockAttester();

      const rinkebyAttester = await getNetworkAttester(
        AttesterNetwork.Rinkeby,
        "attester-1"
      );
      const polygonAttester = await getNetworkAttester(
        AttesterNetwork.Polygon,
        "attester-1"
      );

      expect(rinkebyAttester).toMatchObject(
        expectedNetworkAttesters["rinkeby"]["attester-1"]
      );
      expect(polygonAttester).toMatchObject(
        expectedNetworkAttesters["polygon"]["attester-1"]
      );
    });
  });
});
