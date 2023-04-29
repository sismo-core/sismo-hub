import { FetchedData } from "topics/group";

// export type QueryEventsTokensOwnersOuput = {
//   events: { tokens: { owner: { id: string | number }[] } };
// };

// export type QueryCollectionOwnersOutput = {
//   event: { tokens: { owner: { id: string | number } }[] };
// };

export type QueryCollectionOwnersInput = { contractAddress: string };

export interface IAlchemyProvider {
  queryCollectionOwners(
    input: QueryCollectionOwnersInput
  ): Promise<FetchedData>;
}

///GET OWNERS FOR COLLECTION SIMPLE
///
///
///

export type GetOwnersForCollectionSimpleInput = {
  contractAddress: string;
  chain: string;
};

export type GetOwnersForCollectionSimpleOutput = {
  ownerAddress: string[];
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
  pageKey?: string;
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
