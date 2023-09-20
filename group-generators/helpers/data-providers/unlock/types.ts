import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export enum ChainSelectorType {
  MAINNET = "https://api.thegraph.com/subgraphs/name/unlock-protocol/mainnet-v2",
  GOERLI = "https://api.thegraph.com/subgraphs/name/unlock-protocol/goerli-v2",
  OPTIMISM = "https://api.thegraph.com/subgraphs/name/unlock-protocol/optimism-v2",
  BSC = "https://api.thegraph.com/subgraphs/name/unlock-protocol/bsc-v2",
  GNOSIS = "https://api.thegraph.com/subgraphs/name/unlock-protocol/gnosis-v2",
  POLYGON = "https://api.thegraph.com/subgraphs/name/unlock-protocol/polygon-v2",
  ARBITRUM = "https://api.thegraph.com/subgraphs/name/unlock-protocol/arbitrum-v2",
  CELO = "https://api.thegraph.com/subgraphs/name/unlock-protocol/celo-v2",
  AVALANCHE = "https://api.thegraph.com/subgraphs/name/unlock-protocol/avalanche-v2",
}

export const fromStringToSupportedNetwork = (network: string): ChainSelectorType => {
  switch (network) {
    case "mainnet":
    case "1":
      return ChainSelectorType.MAINNET;
    case "bsc":
    case "56":
      return ChainSelectorType.BSC;
    case "gnosis":
    case "100":
      return ChainSelectorType.GNOSIS;
    case "avalanche":
    case "43114":
      return ChainSelectorType.AVALANCHE;
    case "polygon":
    case "137":
      return ChainSelectorType.POLYGON;
    case "arbitrum":
    case "42161":
      return ChainSelectorType.ARBITRUM;
    case "celo":
    case "42220":
      return ChainSelectorType.CELO;
    case "optimism":
    case "10":
      return ChainSelectorType.OPTIMISM;
    case "goerli":
    case "5":
      return ChainSelectorType.GOERLI;
    default:
      throw new Error(`Unsupported network named ${network}`);
  }
};

export type QueryUnlockOutput = {
  locks: [
    {
      keys: [
        {
          owner: string;
          expiration: string;
          tokenId: string;
        }
      ];
    }
  ];
};

export type QueryUnlockInput = { lockAddress: string; chain: string };

export interface IUnlockSubgraphProvider extends ISubgraphProvider {
  getKeysInLock(input: QueryUnlockInput): Promise<FetchedData>;
}
