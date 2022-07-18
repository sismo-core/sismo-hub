import attesters from "../../../attesters";
import { AttesterNetwork, ConstructedAttester } from "./types";

const asyncFilter = async (arr: Array<any>, predicate: any) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_, i) => results[i]);
};

export type ConstructedNetworkAttesters = {
  [key: string]: ConstructedAttester;
};

export type AllConstructedAttesters = {
  [key: string]: ConstructedNetworkAttesters;
};

export async function getConstructedNetworkAttesters(
  network: AttesterNetwork
): Promise<ConstructedNetworkAttesters> {
  const constructedNetworkAttesters: ConstructedAttester[] = await Promise.all(
    (
      await asyncFilter(attesters, async (attester: any) => {
        return (
          (await attester())?.availableNetworkConfigurations[network] !==
          undefined
        );
      })
    ).map(async (attester) => {
      return (await attester()).getForNetwork(network).compute();
    })
  );

  return constructedNetworkAttesters
    .filter((attester) => attester.configuration)
    .reduce((acc, curr) => ({ ...acc, [curr.name]: curr }), {});
}

export async function getConstructedAttesters(): Promise<AllConstructedAttesters> {
  const allAttesters: AllConstructedAttesters = {};

  for (const networkAttester in AttesterNetwork) {
    allAttesters[networkAttester.toLowerCase()] =
      await getConstructedNetworkAttesters(
        networkAttester.toLowerCase() as AttesterNetwork
      );
  }

  return allAttesters;
}

export async function getConstructNetworkAttester(
  network: AttesterNetwork,
  name: string
): Promise<ConstructedAttester> {
  const attesters = await getConstructedNetworkAttesters(network);
  return attesters[name] ?? {};
}
