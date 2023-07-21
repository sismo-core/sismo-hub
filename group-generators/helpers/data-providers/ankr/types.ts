export type TokenInfo = {
  network: string;
  address: string;
};

export enum SupportedNetwork {
  ETH = "eth",
  BSC = "bsc",
  FANTOM = "fantom",
  AVALANCHE = "avalanche",
  POLYGON = "polygon",
  ARBITRUM = "arbitrum",
  SYSCOIN = "syscoin",
  OPTIMISM = "optimism",
  ETH_GOERLI = "eth_goerli",
  POLYGON_MUMBAI = "polygon_mumbai",
  AVALANCHE_FUJI = "avalanche_fuji"
}

export const fromStringToSupportedNetwork = (network: string): SupportedNetwork => {
  switch (network) {
    case "eth" || "1":
      return SupportedNetwork.ETH;
    case "bsc" || "56":
      return SupportedNetwork.BSC;
    case "fantom" || "250":
      return SupportedNetwork.FANTOM;
    case "avalanche" || "43114":
      return SupportedNetwork.AVALANCHE;
    case "polygon" || "137":
      return SupportedNetwork.POLYGON;
    case "arbitrum" || "42161":
      return SupportedNetwork.ARBITRUM;
    case "syscoin" || "57":
      return SupportedNetwork.SYSCOIN;
    case "optimism" || "10":
      return SupportedNetwork.OPTIMISM;
    case "eth_goerli" || "5":
      return SupportedNetwork.ETH_GOERLI;
    case "polygon_mumbai" || "80001":
      return SupportedNetwork.POLYGON_MUMBAI;
    case "avalanche_fuji" || "43113":
      return SupportedNetwork.AVALANCHE_FUJI;
    default:
      throw new Error(`Unsupported network named ${network}`);
  }
};

export type AnkrTokenQueryResponse = {
  error: Record<string, unknown>;
  id: number;
  jsonrpc: string;
  result: {
    blockchain: string;
    contractAddress: string;
    holders: {
      balance: string;
      balanceRawInteger: string;
      holderAddress: string;
    }[];
    holdersCount: number;
    nextPageToken: string;
    tokenDecimals: number;
  };
};

export type AnkrTokenQueryParam = {
  id: number;
  jsonrpc: string;
  method: string;
  params: {
    blockchain: string;
    contractAddress: string;
    pageSize: number;
    pageToken: string;
  };
};
