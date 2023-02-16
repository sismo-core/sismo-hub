import { OnChainRootsRegistry, MemoryRootsRegistry } from ".";
import { IRootsRegistry } from "@badges-metadata/base/hydra-s1";
import { Network } from "topics/attester";

export const rootsRegistryInit = ({
  network,
  attesterAddress,
  rootsRegistryAddress,
}: {
  network: Network;
  rootsRegistryAddress: string;
  attesterAddress: string;
}): IRootsRegistry => {
  if (network === Network.Test) {
    return new MemoryRootsRegistry();
  } else {
    return new OnChainRootsRegistry(
      network,
      attesterAddress,
      rootsRegistryAddress
    );
  }
};
