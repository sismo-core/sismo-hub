import { FetchedData } from "topics/group";

export enum SupportedNetwork {
  MAINNET = "eth-mainnet",
  GOERLI = "eth-goerli",
  POLYGON = "polygon-mainnet",
  MUMBAI = "polygon-mumbai",
  ARBITRUM = "arb-mainnet",
  ARBITRUM_GOERLI = "arb-goerli",
  OPTIMISM = "opt-mainnet",
  OPTIMISM_GOERLI = "opt-goerli",
}

export const fromStringToSupportedNetwork = (network: string): SupportedNetwork => {
  switch (network) {
    case "eth-mainnet":
    case "1":
      return SupportedNetwork.MAINNET;
    case "eth-goerli":
    case "5":
      return SupportedNetwork.GOERLI;
    case "polygon-mainnet":
    case "137":
      return SupportedNetwork.POLYGON;
    case "polygon-mumbai":
    case "80001":
      return SupportedNetwork.MUMBAI;
    case "arb-mainnet":
    case "42161":
      return SupportedNetwork.ARBITRUM;
    case "arb-goerli":
    case "421613":
      return SupportedNetwork.ARBITRUM_GOERLI;
    case "opt-mainnet":
    case "10":
      return SupportedNetwork.OPTIMISM;
    case "opt-goerli":
    case "420":
      return SupportedNetwork.OPTIMISM_GOERLI;
    default:
      throw new Error(`Unsupported network named ${network}`);
  }
};

export interface IAlchemyProvider {
  getOwnersForCollection(Params: GetOwnersForCollectionParams): Promise<FetchedData>;
  getOwnersForCollectionCount(Params: GetOwnersForCollectionParams): Promise<number>;
  getOwnersOfTokenIds(Params: GetOwnersOfTokenIdsParams): Promise<FetchedData>;
  getOwnersOfTokenIdsCount(Params: GetOwnersOfTokenIdsParams): Promise<number>;
  getOwnersOfNftsMatchingTrait(Params: GetOwnersOfNftsMatchingTraitParams): Promise<FetchedData>;
  getOwnersOfNftsMatchingTraitCount(Params: GetOwnersOfNftsMatchingTraitParams): Promise<number>;
  getTokenIdsOfContract(Params: GetTokenIdsOfContractParams): Promise<FetchedData>;
  getTokenIdsOfContractCount(Params: GetTokenIdsOfContractParams): Promise<number>;
}

export type GetOwnersForCollectionParams = {
  chain: string;
  contractAddress: string;
};

export type GetOwnersForCollectionResponse = {
  ownerAddresses: GetOwnersForCollectionResponseData[];
  pageKey: string;
};

export type GetOwnersForCollectionResponseData = {
  ownerAddress: string;
  tokenBalances: tokenBalances[];
};

export type tokenBalances = {
  tokenId: string;
  balance: number;
};

export type GetOwnersOfTokenIdsParams = {
  chain: string;
  contractAddress: string;
  tokenIds: string[];
};

export type GetOwnersOfTokenIdsResponse = {
  owners: string[];
  pageKey: string;
};

export type GetOwnerAndTokenBalancesParams = {
  tokenIds: string[];
};

export type GetOwnerAndTokenBalancesResponse = {
  ownerAddresses: OwnerInfo[];
  pageKey: string;
};

export type OwnerInfo = {
  ownerAddress: string;
  tokenBalances: TokenBalance[];
};

export type TokenBalance = {
  tokenId: string;
  balance: number;
};

export type GetOwnersOfNftsMatchingTraitParams = {
  contractAddress: string;
  chain: string;
  traitType: string;
  traitValue: string;
};

export type NftsMatchingTraitParams = {
  contractAddress: string;
  chain: string;
  traitType: string;
  traitValue: string;
};

export type GetTokenIdsForNftsMatchingTraitParams = {
  traitType: string;
  traitValue: string;
};

export type TraitParams = {
  traitType: string;
  traitValue: string;
};

export type GetNftsForCollectionResponse = {
  nfts: NFT[];
  nextToken: string;
};

export type NFT = {
  id: {
    tokenId: string;
  };
  metadata: {
    attributes: NFTAttribute[];
  };
};

export type NFTAttribute = {
  trait_type: string;
  value: string;
};

export type GetTokenIdsOfContractParams = {
  chain: string;
  contractAddress: string;
};

export type GetTokenIdsOfContractResponse = {
  ownerAddresses: OwnerInfo[];
  pageKey: string;
};
