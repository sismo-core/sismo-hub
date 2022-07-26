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
export async function setupMockAttester(mockAttester: Attester) {
  jest.doMock("../../../../attesters", () => {
    return [mockAttester];
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
