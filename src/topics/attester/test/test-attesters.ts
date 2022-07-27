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

async function setupNetworkAttesterFunctions() {
  const attesterHelper = await require("../attester.helper");

  getNetworksAttesters = attesterHelper.getNetworksAttesters;
  getNetworkAttesters = attesterHelper.getNetworkAttesters;
  getNetworkAttester = attesterHelper.getNetworkAttester;
}

export async function setupMockEmptyAttester() {
  jest.doMock("../../../../attesters", () => {
    return [];
  });

  await setupNetworkAttesterFunctions();
}

export async function setupMockAttester() {
  jest.doMock("../../../../attesters", () => {
    return [MockAttester1];
  });

  await setupNetworkAttesterFunctions();
}

export function unmockAttester() {
  jest.unmock("../../../../attesters");
  jest.resetModules();
}

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
