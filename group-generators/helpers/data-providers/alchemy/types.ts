import { FetchedData } from "topics/group";

export const availableChains: string[] = [
  "eth-mainnet",
  "eth-goerli",
  "polygon-mainnet",
  "polygon-mumbai",
  "arb-mainnet",
  "arb-goerli",
  "opt-mainnet",
  "opt-goerli",
];

export type QueryCollectionOwnersParams = { contractAddress: string };

export interface IAlchemyProvider {
  getOwnersForCollectionSimple(
    Params: QueryCollectionOwnersParams
  ): Promise<FetchedData>;
}

///GET OWNERS FOR COLLECTION SIMPLE
///
///
///

export type GetOwnersForCollectionSimpleParams = {
  chain: string;
  contractAddress: string;
};

export type GetOwnersForCollectionSimpleResponse = {
  ownerAddresses: string[];
};

///GET OWNERS FOR COLLECTION
///
///
///

export type GetOwnersForCollectionParams = {
  contractAddress?: string;
  chain?: string;
  tokenIds: string[];
};

export type GetOwnersForCollectionResponse = {
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

/// GET NFTS FOR COLLECTION
///
///
///

export type getOwnersOfNftsMatchingTraitParams = {
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

export type getTokenIdsForNftsMatchingTraitParams = {
  traitType: string;
  traitValue: string;
};

export type TraitParams = {
  traitType: string;
  traitValue: string;
};

// export type GetNftsForCollectionParams = {
//   contractAddress: string;
//   chain: string;
//   traitType: string;
//   traitValue: string;
// };

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
