import attesters from "../../../attesters";
import { Attester } from "./attester";
import { NetworkAttesters, NetworksAttesters } from "./attester.helper.types";
import { AttesterNetwork } from "./attester.types";

// Utility function to do async filtering of an array
const asyncFilter = async (arr: Array<any>, predicate: any) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_, i) => results[i]);
};

/**
 * Returns all the attesters from a specific network
 * @param network The network to get the attesters for
 * @returns All the attesters from a specific network
 */
export async function getNetworkAttesters(
  network: AttesterNetwork
): Promise<NetworkAttesters> {
  const filteredNetworkAttester = await asyncFilter(
    attesters,
    (attester: Attester) => {
      return attester?.hasNetworkConfiguration(network);
    }
  );

  const networkAttesters: Attester[] = await Promise.all(
    filteredNetworkAttester.map(async (attester) => {
      return attester?.switchNetwork(network);
    })
  );

  // Transform the array in an object where the keys are the attester names
  return networkAttesters.reduce(
    (acc, curr) => ({ ...acc, [curr.name]: curr }),
    {}
  );
}

/**
 * Returns all the attesters from all the networks
 * @returns All the attesters from all the networks
 */
export async function getNetworksAttesters(): Promise<NetworksAttesters> {
  const allAttesters: NetworksAttesters = {};

  for (const networkAttester in AttesterNetwork) {
    allAttesters[networkAttester.toLowerCase()] = await getNetworkAttesters(
      networkAttester.toLowerCase() as AttesterNetwork
    );
  }

  return allAttesters;
}

/**
 * Returns a specific attester from a specific network
 * @param network The network to get the attester from
 * @param name The attester name
 * @returns A specific attester from a specific network
 */
export async function getNetworkAttester(
  network: AttesterNetwork,
  name: string
): Promise<Attester> {
  const attesters = await getNetworkAttesters(network);
  return attesters[name];
}
