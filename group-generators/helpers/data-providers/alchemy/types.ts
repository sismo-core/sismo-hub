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
  getOwnersForOneTokenId(
    Params: GetOwnersForOneTokenIdParams
  ): Promise<FetchedData>;
  getOwnersForOneTokenIdCount(
    Params: GetOwnersForOneTokenIdParams
  ): Promise<number>;
  getOwnersOfNftsMatchingTrait(
    Params: GetOwnersOfNftsMatchingTraitParams
  ): Promise<FetchedData>;
  getOwnersOfNftsMatchingTraitCount(
    Params: GetOwnersOfNftsMatchingTraitParams
  ): Promise<number>;
  getOwnersOfNftsMatchingTraitCount(
    Params: GetOwnersOfNftsMatchingTraitParams
  ): Promise<FetchedData>;
  getOwnersByTokenIds(Params: GetOwnersByTokenIdsParams): Promise<FetchedData>;
  getOwnersByTokenIdsCount(Params: GetOwnersByTokenIdsParams): Promise<number>;
}

export type GetOwnersForCollectionParams = {
  chain: string;
  contractAddress: string;
};

export type GetOwnersForCollectionResponse = {
  ownerAddresses: string[];
  pageKey: string;
};

export type GetOwnersForOneTokenIdParams = {
  chain: string;
  contractAddress: string;
  tokenId: string;
};

export type GetOwnersForOneTokenIdResponse = {
  owners: string[];
  pageKey: string;
};

export type GetOwnersByTokenIdsParams = {
  contractAddress?: string;
  chain?: string;
  tokenIds: string[];
};

export type GetOwnersByTokenIdsResponse = {
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
