import { AttestationsCollection } from "../../attestations-collection";
import { Badge } from "../../badge";
import { Attester } from "../attester";
import { NetworkAttesters, NetworksAttesters } from "../attester.helper.types";
import { AttesterNetwork } from "../attester.types";

export let getNetworksAttesters: () => Promise<NetworksAttesters>;
export let getNetworkAttesters: (
  network: AttesterNetwork
) => Promise<NetworkAttesters>;
export let getNetworkAttester: (
  network: AttesterNetwork,
  name: string
) => Promise<Attester>;

/**
 * Use this utility function to setup the helper functions once the modules have been mocked
 */
async function setupNetworkAttesterFunctions() {
  const attesterHelper = await require("../attester.helper");

  getNetworksAttesters = attesterHelper.getNetworksAttesters;
  getNetworkAttesters = attesterHelper.getNetworkAttesters;
  getNetworkAttester = attesterHelper.getNetworkAttester;
}

/**
 * Use this utility function to setup an empty mock attester
 */
export async function setupMockEmptyAttester() {
  jest.doMock("../../../../attesters", () => {
    return [];
  });

  await setupNetworkAttesterFunctions();
}

/**
 * Use this utility function to the setup the mock attester
 * @param mockAttester The mock attester to use
 */
export async function setupMockAttester() {
  jest.doMock("../../../../attesters", () => {
    return [MockAttester1];
  });

  await setupNetworkAttesterFunctions();
}

/**
 * Use this utility function to unmock the attester and reset node_modules cache
 */
export function unmockAttester() {
  jest.unmock("../../../../attesters");
  jest.resetModules();
}

/**
 * MockAttester class
 */
export class MockAttester1 extends Attester {
  name = "attester-1";
  networkConfigurations = {
    rinkeby: {
      address: "",
      firstCollectionId: 100,
    },
    polygon: {
      address: "",
      firstCollectionId: 100,
    },
  };
  attestationsCollections = [
    new AttestationsCollection({
      groupFetcher: async () => [],
      badge: new Badge({
        name: "ZK Badge: Test Badge",
        description: "ZK Badge received by testers",
        image: "./badges/badge_digger.svg",
        requirements: [],
      }),
    }),
  ];
}
