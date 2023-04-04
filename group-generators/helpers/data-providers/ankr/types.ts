export type TokenInfo = {
  network: string;
  address: string;
};

export enum Chains {
  "eth",
  "bsc",
  "fantom",
  "avalanche",
  "polygon",
  "arbitrum",
  "syscoin",
  "optimism",
  "eth_goerli",
  "polygon_mumbai",
  "avalanche_fuji",
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
