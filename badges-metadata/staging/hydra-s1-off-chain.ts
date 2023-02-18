import { generateHydraS1Attester } from "@badges-metadata/base/hydra-s1";
import { keccak256ToAddress } from "@badges-metadata/base/hydra-s1/helpers";
import { Network } from "topics/attester";

const HYDRA_S1_OFF_CHAIN_ATTESTER = keccak256ToAddress(
  "HYDRA_S1_OFF_CHAIN_ATTESTER"
);

export const hydraS1OffchainAttester = generateHydraS1Attester(
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
