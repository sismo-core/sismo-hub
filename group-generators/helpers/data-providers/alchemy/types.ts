import { FetchedData } from "topics/group";

export const AvailableChains: string[] = [
  "eth-mainnet",
  "eth-goerli",
  "polygon-mainnet",
  "polygon-mumbai",
  "arb-mainnet",
  "arb-goerli",
  "opt-mainnet",
  "opt-goerli",
];

export interface IAlchemyProvider {
  getOwnersForCollection(
    Params: GetOwnersForCollectionParams
  ): Promise<FetchedData>;
  getOwnersForCollectionCount(
    Params: GetOwnersForCollectionParams
  ): Promise<number>;
  getOwnersOfTokenIds(Params: GetOwnersOfTokenIdsParams): Promise<FetchedData>;
  getOwnersOfTokenIdsCount(Params: GetOwnersOfTokenIdsParams): Promise<number>;
  getOwnersOfNftsMatchingTrait(
    Params: GetOwnersOfNftsMatchingTraitParams
  ): Promise<FetchedData>;
  getOwnersOfNftsMatchingTraitCount(
    Params: GetOwnersOfNftsMatchingTraitParams
  ): Promise<number>;
  getTokenIdsOfContract(
    Params: GetTokenIdsOfContractParams
  ): Promise<FetchedData>;
  getTokenIdsOfContractCount(
    Params: GetTokenIdsOfContractParams
  ): Promise<number>;
}

export type GetOwnersForCollectionParams = {
  chain: string;
  contractAddress: string;
};

export type GetOwnersForCollectionResponse = {
  ownerAddresses: string[];
  pageKey: string;
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
