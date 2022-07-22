import attesters from "../../../attesters";
import { Attester } from "./attester";
import { AttesterNetwork } from "./attester.types";

const asyncFilter = async (arr: Array<any>, predicate: any) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_, i) => results[i]);
};

export type NetworkAttesters = {
  [key: string]: Attester;
};

export type NetworksAttesters = {
  [key: string]: NetworkAttesters;
};

export async function getNetworkAttesters(
  network: AttesterNetwork
): Promise<NetworkAttesters> {
  const networkAttesters: Attester[] = await Promise.all(
    (
      await asyncFilter(attesters, async (attester: any) => {
        return (
          (await attester())?.availableNetworkConfigurations[network] !==
          undefined
        );
      })
    ).map(async (attester) => {
      return (await attester()).getForNetwork(network);
    })
  );

  return networkAttesters.reduce(
    (acc, curr) => ({ ...acc, [curr.name]: curr }),
    {}
  );
}

export async function getNetworksAttesters(): Promise<NetworksAttesters> {
  const allAttesters: NetworksAttesters = {};

  for (const networkAttester in AttesterNetwork) {
    allAttesters[networkAttester.toLowerCase()] = await getNetworkAttesters(
      networkAttester.toLowerCase() as AttesterNetwork
    );
  }

  return allAttesters;
}

export async function getNetworkAttester(
  network: AttesterNetwork,
  name: string
): Promise<Attester> {
  const attesters = await getNetworkAttesters(network);
  return attesters[name];
}
