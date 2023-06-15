import { generateHydraS2RegistryTreeConfig } from "@badges-metadata/base/hydra";
import { Network } from "topics/registry-tree";


export const hydraS2RegistryTreeConfig = generateHydraS2RegistryTreeConfig(
    {
      [Network.Gnosis]: {
        rootsRegistryAddress: "0x9B0C9EF48DEc082904054cf9183878E1f4e04D79",
      },
      [Network.Polygon]: {
        rootsRegistryAddress: "0x818c0f863C6B8E92c316924711bfEb2D903B4A77",
      },
      [Network.Optimism] : {
        rootsRegistryAddress: "",
      },
      [Network.ArbitrumOne]: {
        rootsRegistryAddress: "",
      },
      [Network.Goerli]: {
        rootsRegistryAddress: "0xF3dAc93c85e92cab8f811b3A3cCaCB93140D9304",
      },
      [Network.Sepolia] : {
        rootsRegistryAddress: "",
      },
      [Network.Mumbai]: {
        rootsRegistryAddress: "0x51B3ec080D1459232dbea86B751F75b5204a4abC",
      },
      [Network.OptimismGoerli] : {
        rootsRegistryAddress: "",
      },
      [Network.ArbitrumGoerli]: {
        rootsRegistryAddress: "",
      },
    },
    {
      name: "hydra-s2",
    }
  );
