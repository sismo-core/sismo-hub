import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export type QueryBadgeHoldersOutput = {
  badgeSpec: {
    id: string;
    badges: [
      {
        id: string;
        owner: {
          id: string;
        };
        createdAt: number;
      }
    ];
  };
};

export type QueryBadgeHoldersInput = {
  id: string;
};

export enum SupportedNetworkLink {
  ETH = "https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-mainnet",
  POLYGON = "https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-polygon",
  OPTIMISM = "https://thegraph.com/hosted-service/subgraph/otterspace-xyz/badges-optimism",
  GOERLI = "https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-goerli",
  OPTIMISM_GOERLI = "https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism-goerli",
}

export const fromStringToSupportedNetworkLink = (network: string): SupportedNetworkLink => {
  switch (network) {
    case "eth":
    case "1":
      return SupportedNetworkLink.ETH;
    case "polygon":
    case "137":
      return SupportedNetworkLink.POLYGON;
    case "optimism":
    case "10":
      return SupportedNetworkLink.OPTIMISM;
    case "eth_goerli":
    case "5":
      return SupportedNetworkLink.GOERLI;
    case "opt-goerli":
    case "420":
      return SupportedNetworkLink.OPTIMISM_GOERLI;
    default:
      throw new Error(`Unsupported network named ${network}`);
  }
};

export interface IOtterspaceSubgraphProvider extends ISubgraphProvider {
  getBadgeHolders(input: QueryBadgeHoldersInput): Promise<FetchedData>;
}
