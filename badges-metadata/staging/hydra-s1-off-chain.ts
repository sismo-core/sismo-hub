import { generateHydraS1RegistryTreeConfig } from "@badges-metadata/base/hydra";
import { keccak256ToAddress } from "@badges-metadata/base/hydra/helpers";
import { Network } from "topics/registry-tree";

const HYDRA_S1_OFF_CHAIN_ATTESTER = keccak256ToAddress(
  "HYDRA_S1_OFF_CHAIN_ATTESTER"
);

export const hydraS1OffchainRegistryTreeConfig =
  generateHydraS1RegistryTreeConfig(
    {
      [Network.Goerli]: {
        attesterAddress: HYDRA_S1_OFF_CHAIN_ATTESTER,
        rootsRegistryAddress: "0xdDa4c8d2933dAA21Aac75B88fF59725725ba813F",
      },
    },
    {
      name: "hydra-s1-off-chain",
    }
  );
