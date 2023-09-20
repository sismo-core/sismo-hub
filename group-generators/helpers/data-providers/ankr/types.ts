export type TokenInfo = {
  network: string;
  address: string;
};

export enum SupportedNetwork {
  ETH = "eth",
  BASE = "base",
  BSC = "bsc",
  FANTOM = "fantom",
  AVALANCHE = "avalanche",
  POLYGON = "polygon",
  ARBITRUM = "arbitrum",
  SYSCOIN = "syscoin",
  OPTIMISM = "optimism",
  ETH_GOERLI = "eth_goerli",
  BASE_GOERLI = "base_goerli",
  POLYGON_MUMBAI = "polygon_mumbai",
  AVALANCHE_FUJI = "avalanche_fuji",
}

export const fromStringToSupportedNetwork = (network: string): SupportedNetwork => {
  switch (network) {
    case "eth":
    case "1":
      return SupportedNetwork.ETH;
    case "base":
    case "8453":
      return SupportedNetwork.BASE;
    case "bsc":
    case "56":
      return SupportedNetwork.BSC;
    case "fantom":
    case "250":
      return SupportedNetwork.FANTOM;
    case "avalanche":
    case "43114":
      return SupportedNetwork.AVALANCHE;
    case "polygon":
    case "137":
      return SupportedNetwork.POLYGON;
    case "arbitrum":
    case "42161":
      return SupportedNetwork.ARBITRUM;
    case "syscoin":
    case "57":
      return SupportedNetwork.SYSCOIN;
    case "optimism":
    case "10":
      return SupportedNetwork.OPTIMISM;
    case "eth_goerli":
    case "5":
      return SupportedNetwork.ETH_GOERLI;
    case "base_goerli":
    case "84531":
      return SupportedNetwork.BASE_GOERLI;
    case "polygon_mumbai":
    case "80001":
      return SupportedNetwork.POLYGON_MUMBAI;
    case "avalanche_fuji":
    case "43113":
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
