import "reflect-metadata";
import { DependencyContainer } from "tsyringe";
import { getMemoryContainer } from "../../../infrastructure";
import { NetworksAttesters } from "../attester.helper.types";
import { AttesterNetwork } from "../attester.types";
import {
  getNetworkAttester,
  getNetworkAttesters,
  getNetworksAttesters,
  MockAttester1,
  setupMockAttester,
  setupMockEmptyAttester,
  unmockAttester,
} from "./test-attesters";

describe("Test attesters helpers", () => {
  let container: DependencyContainer;

  const emptyExpectedNetworkAttesters: NetworksAttesters = {};
  let expectedNetworkAttesters: NetworksAttesters = {};

  beforeAll(async () => {
    container = getMemoryContainer();

    for (const networkAttester in AttesterNetwork) {
      emptyExpectedNetworkAttesters[networkAttester.toLowerCase()] = {};
    }

    const mockAttester1 = JSON.parse(
      JSON.stringify(container.resolve(MockAttester1))
    );

    expectedNetworkAttesters = {
      ...emptyExpectedNetworkAttesters,
      polygon: {
        "attester-1": mockAttester1,
      },
      rinkeby: {
        "attester-1": mockAttester1,
      },
    };
  });

  describe("getNetworksAttesters", () => {
    beforeEach(async () => {
      unmockAttester();
    });

    test("It should return empty networks when no attester was found", async () => {
      await setupMockEmptyAttester();

      const attesters = await getNetworksAttesters();

      expect(attesters).toEqual(emptyExpectedNetworkAttesters);
    });

    test("It should return all the attesters from all networks", async () => {
      await setupMockAttester();

      const allAttesters = await getNetworksAttesters();

      expect(allAttesters).toMatchObject(expectedNetworkAttesters);
    });
  });

  describe("getNetworkAttesters", () => {
    beforeEach(async () => {
      unmockAttester();
    });

    it("Should return empty when the network was not found", async () => {
      const attesters = await getNetworkAttesters("test" as AttesterNetwork);

      expect(attesters).toEqual({});
    });

    test("It should return empty when no attester was found", async () => {
      await setupMockEmptyAttester();

      const attesters = await getNetworkAttesters(AttesterNetwork.Rinkeby);

      expect(attesters).toEqual(emptyExpectedNetworkAttesters["rinkeby"]);
    });

    test("It should return all attesters of the network rinkeby", async () => {
      await setupMockAttester();

      const attesters = await getNetworkAttesters(AttesterNetwork.Rinkeby);

      expect(attesters).toMatchObject(expectedNetworkAttesters["rinkeby"]);
    });

    test("It should return all attesters of the network polygon", async () => {
      await setupMockAttester();

      const attesters = await getNetworkAttesters(AttesterNetwork.Polygon);

      expect(attesters).toMatchObject(expectedNetworkAttesters["polygon"]);
    });
  });

  describe("getNetworkAttester", () => {
    beforeEach(async () => {
      unmockAttester();
    });

    it("Should return undefined when the network was not found", async () => {
      await setupMockEmptyAttester();

      const attesters = await getNetworkAttester(
        "test" as AttesterNetwork,
        "test"
      );

      expect(attesters).toEqual(undefined);
    });

    test("It should return undefined when the attester was not found", async () => {
      await setupMockEmptyAttester();

      const attesters = await getNetworkAttester(
        AttesterNetwork.Rinkeby,
        "test"
      );

      expect(attesters).toEqual(undefined);
    });

    test("It should return the attester of the polygon network", async () => {
      await setupMockAttester();

      const polygonAttester = await getNetworkAttester(
        AttesterNetwork.Polygon,
        "attester-1"
      );

      expect(polygonAttester).toMatchObject(
        expectedNetworkAttesters["polygon"]["attester-1"]
      );
    });

    test("It should return the attester of the rinkeby network", async () => {
      await setupMockAttester();

      const rinkebyAttester = await getNetworkAttester(
        AttesterNetwork.Rinkeby,
        "attester-1"
      );

      expect(rinkebyAttester).toMatchObject(
        expectedNetworkAttesters["rinkeby"]["attester-1"]
      );
    });
  });
});
