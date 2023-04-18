import { generateHydraS2RegistryTreeConfig } from "@badges-metadata/base/hydra";
import { Network } from "topics/registry-tree";


export const hydraS2RegistryTreeConfig = generateHydraS2RegistryTreeConfig(
    {
      [Network.Goerli]: {
        rootsRegistryAddress: "0xEF170C37DFE6022A9Ed10b8C81d199704ED38a11",
      },
      [Network.Mumbai]: {
        rootsRegistryAddress: "0x787A74BE3AfD2bE012bD7E7c4CF2c6bDa2e70c83",
      },
    },
    {
      name: "hydra-s2",
    }
  );
