import { BigNumberish } from "ethers";

export type BigQueryProviderConstructor = {
  network: SupportedNetwork;
};

export type BigQueryContractTxsArgs = {
  contractAddress: string;
  dateRange?: BigQueryDateRange;
};

export type BigQueryEthUserArgs = {
  minNumberOfTransactions: number;
  dateRange?: BigQueryDateRange;
};

export type BigQueryDateRange = {
  min?: string;
  max?: string;
};

export type BigQueryNftHoldersArgs = {
  contractAddress: string;
  snapshot?: string;
  options?: {
    dateRange?: BigQueryDateRange;
  };
};

export type BigQueryERC20HoldersArgs = {
  contractAddress: string;
  snapshot?: string;
  options?: {
    dateRange?: BigQueryDateRange;
  };
};

export type BigQueryERC1155HoldersArgs = {
  contractAddress: string;
  tokenId?: string;
  snapshot?: string;
  options?: {
    timestampPeriodUtc?: string[];
  };
};

export type ERC1155EventType = {
  operator: string;
  from: string;
  to: string;
  id: BigNumberish;
  value: BigNumberish;
};

export type BigQueryEventArgs = {
  contractAddress: string;
  eventABI: string;
  options?: {
    timestampPeriodUtc?: string[];
    data?: string;
  };
};

export type BigQueryBadgeArgs = {
  contractAddress: string;
  zkBadgeId: string;
  options?: {
    timestampPeriodUtc?: string[];
  };
};

export type BadgeEventType = {
  operator: string;
  from: string;
  to: string;
  id: BigNumberish;
  value: BigNumberish;
};

export type BigQueryMethodArgs = {
  contractAddress: string;
  functionABI: string;
  options?: {
    functionArgs: boolean;
    timestampPeriodUtc?: string[];
  };
};

export enum SupportedNetwork {
  MAINNET = "mainnet",
  POLYGON = "polygon",
}

export const fromStringToSupportedNetwork = (network: string): SupportedNetwork => {
  switch (network) {
    case "mainnet":
    case "1":
      return SupportedNetwork.MAINNET;
    case "polygon":
    case "137":
      return SupportedNetwork.POLYGON;
    default:
      throw new Error(`Unsupported network named ${network}`);
  }
};

export const dataUrl = {
  [SupportedNetwork.MAINNET]: "bigquery-public-data.crypto_ethereum",
  [SupportedNetwork.POLYGON]: "public-data-finance.crypto_polygon",
};
