export type TokenInfo = {
  network: string;
  address: string;
};

export enum Chains {
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
