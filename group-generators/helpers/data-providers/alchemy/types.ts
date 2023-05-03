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

// export type QueryEventsTokensOwnersOuput = {
//   events: { tokens: { owner: { id: string | number }[] } };
// };

// export type QueryCollectionOwnersOutput = {
//   event: { tokens: { owner: { id: string | number } }[] };
// };

export type QueryCollectionOwnersInput = { contractAddress: string };

export interface IAlchemyProvider {
  getOwnersForCollectionSimple(
    input: QueryCollectionOwnersInput
  ): Promise<FetchedData>;
}

///GET OWNERS FOR COLLECTION SIMPLE
///
///
///

export type GetOwnersForCollectionSimpleInput = {
  chain: string;
  contractAddress: string;
};

export type GetOwnersForCollectionSimpleOutput = {
  ownerAddresses: string[];
};

///GET OWNERS FOR COLLECTION
///
///
///

export type GetOwnersForCollectionInput = {
  contractAddress: string;
  chain: string;
  tokenIds: string[];
};

export type GetOwnersForCollectionOutput = {
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

export type GetNftsForCollectionInput = {
  contractAddress: string;
  chain: string;
  traitType: string;
  traitValue: string;
};

export type GetNftsForCollectionOutput = {
  nfts: NFT[];
  nextToken?: string;
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
