import { getNetworkAllAttesters, getNetworkAttester } from "../../../attesters";
import { ConstructAttesterFn, ConstructedAttester } from "./types";

export async function getConstructedNetworkAttesters(
  network: string
): Promise<Array<ConstructedAttester | undefined>> {
  const networkAttesters: Array<ConstructAttesterFn | undefined> =
    await getNetworkAllAttesters(network);

  return await Promise.all(
    networkAttesters.map(
      async (networkAttester: ConstructAttesterFn | undefined) => {
        return networkAttester
          ? (await networkAttester())?.compute()
          : undefined;
      }
    )
  );
}

export async function getConstructedNetworkAttester(
  network: string,
  attester: string
): Promise<ConstructedAttester | undefined> {
  const networkAttester = await getNetworkAttester(network, attester);

  return networkAttester ? (await networkAttester())?.compute() : undefined;
}
