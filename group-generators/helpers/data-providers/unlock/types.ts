import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export type ChainSelectorType = {
  [key: string]: string;
};

export const chainSelector: ChainSelectorType = {
  mainnet: "https://api.thegraph.com/subgraphs/name/unlock-protocol/mainnet-v2",
  goerli: "https://api.thegraph.com/subgraphs/name/unlock-protocol/goerli-v2",
  optimism:
    "https://api.thegraph.com/subgraphs/name/unlock-protocol/optimism-v2",
  bsc: "https://api.thegraph.com/subgraphs/name/unlock-protocol/bsc-v2",
  gnosis: "https://api.thegraph.com/subgraphs/name/unlock-protocol/gnosis-v2",
  polygon: "https://api.thegraph.com/subgraphs/name/unlock-protocol/polygon-v2",
  arbitrum:
    "https://api.thegraph.com/subgraphs/name/unlock-protocol/arbitrum-v2",
  celo: "https://api.thegraph.com/subgraphs/name/unlock-protocol/celo-v2",
  avalanche:
    "https://api.thegraph.com/subgraphs/name/unlock-protocol/avalanche-v2",
};

// export type QueryUnlockOutput = {
//   locks: [
//     {
//       keys: [
//         {
//           owner: {
//             address: string;
//           };
//           expiration: string;
//         }
//       ];
//     }
//   ];
// };

export type QueryUnlockOutput = {
  locks: [
    {
      keys: [
        {
          owner: string;
          expiration: string;
        }
      ];
    }
  ];
};

export type QueryUnlockInput = { lockAddress: string; chain: string };

export interface IUnlockSubgraphProvider extends ISubgraphProvider {
  getKeysInLock(input: QueryUnlockInput): Promise<FetchedData>;
}
