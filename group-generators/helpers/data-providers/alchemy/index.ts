import {
  availableChains,
  GetOwnersForCollectionSimpleParams,
  GetOwnersForCollectionSimpleResponse,
  GetOwnersForCollectionParams,
  GetOwnersForCollectionResponse,
  OwnerInfo,
  TokenBalance,
  GetNftsForCollectionResponse,
  NFT,
  TraitParams,
} from "./types";
import { FetchedData } from "topics/group";

export class AlchemyProvider {
  baseUrl: string;
  contractAddress: string;
  private _alchemyAppToken: string | undefined;

  constructor(alchemyAppToken = process.env.ALCHEMY_API_KEY) {
    this._alchemyAppToken = alchemyAppToken;
  }

  //getNFTsForCollection + chain selector
  // - contractAddress
  // - chain
  public async getOwnersForCollectionSimple({
    contractAddress,
    chain,
  }: GetOwnersForCollectionSimpleParams): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    const url = `${this.baseUrl}/getOwnersForCollection?contractAddress=${contractAddress}&withTokenBalances=false`;
    const response = await fetch(url);
    const addresses: GetOwnersForCollectionSimpleResponse =
      await response.json();
    const sismoData: FetchedData = {};

    for (const address of addresses.ownerAddresses) {
      sismoData[address] = 1;
    }
    return sismoData;
  }

  public async getOwnersOfNftsMatchingTrait({
    contractAddress,
    chain,
    traitType,
    traitValue,
  }: GetNftsForCollectionParams): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    this.contractAddress = contractAddress;

    const tokenIds = await this.getTokenIdsForNftsMatchingTrait({
      traitType,
      traitValue,
    });

    return await this.getOwnersForCollection({
      tokenIds,
    });
  }

  //calling getNftsForCollection API
  public async getTokenIdsForNftsMatchingTrait({
    traitType,
    traitValue,
  }: TraitParams): Promise<string[]> {
    const nfts: NFT[] = [];
    for await (const nft of this._getTokenIdsForNftsMatchingTrait()) {
      nfts.push(nft);
    }

    //match NFT's traitType and traitValue to get tokenIds
    return this.matchNftsToTokenIds(nfts, traitType, traitValue);
    // const matchingNfts = nfts.filter((nft) => {
    //   const attributes = nft.metadata.attributes;
    //   const matchingAttributes = attributes.filter(
    //     (attribute) =>
    //       attribute.trait_type === traitType && attribute.value === traitValue
    //   );
    //   return matchingAttributes.length > 0;
    // });
    // const tokenIds = matchingNfts.map((nft) => nft.id.tokenId);

    // return tokenIds;
  }

  //create a function to match nft's traitType and traitValue to return tokenIds
  private matchNftsToTokenIds(
    nfts: NFT[],
    traitType: string,
    traitValue: string
  ): string[] {
    try {
      const matchingNfts = nfts.filter((nft) => {
        const attributes = nft.metadata.attributes;
        const matchingAttributes = attributes.filter(
          (attribute) =>
            attribute.trait_type === traitType && attribute.value === traitValue
        );
        return matchingAttributes.length > 0;
      });
      const tokenIds = matchingNfts.map((nft) => nft.id.tokenId);

      return tokenIds;
    } catch (error) {
      throw new Error(`Error matching NFTs to tokenIds: ${error}`);
    }
  }

  private async *_getTokenIdsForNftsMatchingTrait() {
    let startToken = "";
    let hasNext = true;

    while (hasNext) {
      console.log(`start token ${startToken}`);
      const response = await this.getNftsForCollectionQuery(startToken);

      yield* response.nfts;
      hasNext = !!response.nextToken;
      startToken = response.nextToken;
      console.log(`end token ${startToken}`);
    }
  }

  private async getNftsForCollectionQuery(
    startToken: string
  ): Promise<GetNftsForCollectionResponse> {
    const url = `${this.baseUrl}/getNFTsForCollection?contractAddress=${this.contractAddress}&withMetadata=true&startToken=${startToken}`;
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }

  //OwnerForCollectionParams
  //getOwnersOfNFTTokenId's
  // - contractAddress
  // - chain
  // - tokenId's []
  public async getOwnersForCollection({
    contractAddress,
    chain,
    tokenIds,
  }: GetOwnersForCollectionParams): Promise<FetchedData> {
    if (contractAddress && chain) {
      this.baseUrl = this.urlQueryHandler(chain);
      this.contractAddress = contractAddress;
    }
    const owners: OwnerInfo[] = [];

    for await (const owner of this._getOwnersForCollection()) {
      owners.push(owner);
    }

    return this.filterOwnersByTokenId(owners, tokenIds);

    // const addresses = owners.filter((owner: OwnerInfo) => {
    //   return owner.tokenBalances.some((tokenBalance: TokenBalance) => {
    //     return tokenIds.includes(tokenBalance.tokenId);
    //   });
    // });

    // const sismoData: FetchedData = {};

    // for (const address of addresses) {
    //   sismoData[address.ownerAddress] = address.tokenBalances.length;
    // }
    // return sismoData;
  }

  //create a private function that filters owners by tokenid
  private async filterOwnersByTokenId(
    owners: OwnerInfo[],
    tokenIds: string[]
  ): Promise<FetchedData> {
    try {
      const addresses = owners.filter((owner: OwnerInfo) => {
        return owner.tokenBalances.some((tokenBalance: TokenBalance) => {
          return tokenIds.includes(tokenBalance.tokenId);
        });
      });

      const sismoData: FetchedData = {};
      for (const address of addresses) {
        sismoData[address.ownerAddress] = address.tokenBalances.length;
      }
      return sismoData;
    } catch (error) {
      throw new Error(`Error filtering owners by tokenIds: ${error}`);
    }
  }

  private async *_getOwnersForCollection() {
    let pageKey = "";
    let hasNext = true;
    while (hasNext) {
      const response = await this.getOwnersForCollectionQuery(pageKey);
      yield* response.ownerAddresses;
      hasNext = !!response.pageKey; // Assign value based on presence of page key
      pageKey = response.pageKey;
    }
  }

  private async getOwnersForCollectionQuery(
    pageKey: string
  ): Promise<GetOwnersForCollectionResponse> {
    const url = `${this.baseUrl}/getOwnersForCollection?contractAddress=${this.contractAddress}&withTokenBalances=true&pageKey=${pageKey}`;
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }

  private urlQueryHandler = (chain: string) => {
    if (!availableChains.includes(chain)) {
      throw new Error(`Chain ${chain} not supported`);
    }
    return `https://${chain}.g.alchemy.com/v2/${this._alchemyAppToken}`;
  };
}
