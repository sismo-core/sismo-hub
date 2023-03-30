import { generateHydraS1RegistryTreeConfig } from "@badges-metadata/base/hydra";
import { keccak256ToAddress } from "@badges-metadata/base/hydra/helpers";
import { Network } from "topics/registry-tree";

const HYDRA_S1_OFFCHAIN_ATTESTER = keccak256ToAddress(
  "HYDRA_S1_OFF_CHAIN_ATTESTER"
);

export const hydraS1OffchainRegistryTreeConfig =
  generateHydraS1RegistryTreeConfig(
    {
      [Network.Gnosis]: {
        attesterAddress: HYDRA_S1_OFFCHAIN_ATTESTER,
        rootsRegistryAddress: "0x453bF14103CC941A96721de9A32d5E3d3095e049",
      },
    },
    {
      name: "hydra-s1-off-chain",
    }
  );
