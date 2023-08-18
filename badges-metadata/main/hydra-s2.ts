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
    [Network.Mainnet]: {
      rootsRegistryAddress: "0x2E7f4aC6AC90faeC2D870D012A3BCDBcF792B25C",
    },
    [Network.Optimism]: {
      rootsRegistryAddress: "0xEB2952A4098e15C97E1Ce126FE479f27E2FFB40c",
    },
    [Network.ArbitrumOne]: {
      rootsRegistryAddress: "0xEB2952A4098e15C97E1Ce126FE479f27E2FFB40c",
    },
    [Network.Base]: {
      rootsRegistryAddress: "0xEB2952A4098e15C97E1Ce126FE479f27E2FFB40c",
    },
    [Network.Goerli]: {
      rootsRegistryAddress: "0x32725B00400b799D41c852b6Fd94604e10cb487F",
    },
    [Network.Sepolia]: {
      rootsRegistryAddress: "0x32725B00400b799D41c852b6Fd94604e10cb487F",
    },
    [Network.Mumbai]: {
      rootsRegistryAddress: "0x51B3ec080D1459232dbea86B751F75b5204a4abC",
    },
    [Network.OptimismGoerli]: {
      rootsRegistryAddress: "0x32725B00400b799D41c852b6Fd94604e10cb487F",
    },
    [Network.ArbitrumGoerli]: {
      rootsRegistryAddress: "0x32725B00400b799D41c852b6Fd94604e10cb487F",
    },
    [Network.BaseGoerli]: {
      rootsRegistryAddress: "0x32725B00400b799D41c852b6Fd94604e10cb487F",
    },
    [Network.ScrollTestnet]: {
      rootsRegistryAddress: "0x32725B00400b799D41c852b6Fd94604e10cb487F",
    },
  },
  {
    name: "hydra-s2",
  }
);
