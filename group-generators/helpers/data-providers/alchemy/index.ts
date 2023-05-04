import { toHex } from "web3-utils";
import {
  AvailableChains,
  GetNftsForCollectionResponse,
  GetOwnersForCollectionParams,
  GetOwnersForCollectionResponse,
  GetOwnersByTokenIdsParams,
  GetOwnersByTokenIdsResponse,
  GetOwnersOfNftsMatchingTraitParams,
  GetTokenIdsForNftsMatchingTraitParams,
  OwnerInfo,
  TokenBalance,
  NFT,
} from "./types";
import { FetchedData } from "topics/group";

export class AlchemyProvider {
  baseUrl: string;
  contractAddress: string;
  private _alchemyAppToken: string | undefined;

  constructor(alchemyAppToken = process.env.ALCHEMY_API_KEY) {
    this._alchemyAppToken = alchemyAppToken;
  }

  public async getOwnersOfNftsMatchingTrait({
    contractAddress,
    chain,
    traitType,
    traitValue,
  }: GetOwnersOfNftsMatchingTraitParams): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    this.contractAddress = contractAddress;

    const tokenIds = await this.getTokenIdsForNftsMatchingTrait({
      traitType,
      traitValue,
    });

    return await this.getOwnersByTokenIds({
      tokenIds,
    });
  }

  public async getOwnersForCollection({
    contractAddress,
    chain,
  }: GetOwnersForCollectionParams): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    this.contractAddress = contractAddress;
    const sismoData: FetchedData = {};
    const owners = await this.fetchOwnersForCollection();
    for (const owner of owners) {
      sismoData[owner] = 1;
    }
    return sismoData;
  }

  private async fetchOwnersForCollection() {
    let pageKey = "";
    let hasNext = true;
    const ownersList: string[] = [];
    while (hasNext) {
      const response = await this.fetchOwnersForCollectionQuery(pageKey);
      ownersList.push(...response.ownerAddresses);
      hasNext = !!response.pageKey;
      pageKey = response.pageKey;
    }
    return ownersList;
  }

  private async fetchOwnersForCollectionQuery(
    pageKey: string
  ): Promise<GetOwnersForCollectionResponse> {
    const url = `${this.baseUrl}/getOwnersForCollection?contractAddress=${this.contractAddress}&pageKey=${pageKey}`;
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }

  public async getOwnersByTokenIds({
    contractAddress,
    chain,
    tokenIds,
  }: GetOwnersByTokenIdsParams): Promise<FetchedData> {
    if (contractAddress && chain) {
      this.baseUrl = this.urlQueryHandler(chain);
      this.contractAddress = contractAddress;
    }

    const owners: OwnerInfo[] = [];
    for await (const owner of this.fetchOwnersByTokenIds()) {
      owners.push(owner);
    }

    return this.filterOwnersByTokenId(owners, tokenIds);
  }

  private async filterOwnersByTokenId(
    owners: OwnerInfo[],
    tokenIds: string[]
  ): Promise<FetchedData> {
    //check if tokenid is hex
    const formattedTokenIds = tokenIds.map((tokenId) => {
      if (!tokenId.startsWith("0x")) {
        console.log(`converting ${tokenId} to hex`);
        console.log(toHex(tokenId));
        return toHex(tokenId);
      }
      return tokenId;
    });

    try {
      const addresses = owners.filter((owner: OwnerInfo) => {
        return owner.tokenBalances.some((tokenBalance: TokenBalance) => {
          return formattedTokenIds.includes(tokenBalance.tokenId);
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

  private async *fetchOwnersByTokenIds() {
    let pageKey = "";
    let hasNext = true;
    while (hasNext) {
      const response = await this.fetchOwnersByTokenIdsQuery(pageKey);
      yield* response.ownerAddresses;
      hasNext = !!response.pageKey; // Assign value based on presence of page key
      pageKey = response.pageKey;
    }
  }

  private async fetchOwnersByTokenIdsQuery(
    pageKey: string
  ): Promise<GetOwnersByTokenIdsResponse> {
    const url = `${this.baseUrl}/getOwnersForCollection?contractAddress=${this.contractAddress}&withTokenBalances=true&pageKey=${pageKey}`;
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }

  private async getTokenIdsForNftsMatchingTrait({
    traitType,
    traitValue,
  }: GetTokenIdsForNftsMatchingTraitParams): Promise<string[]> {
    const nfts: NFT[] = [];
    for await (const nft of this.fetchTokenIdsForNftsMatchingTrait()) {
      nfts.push(nft);
    }
    return this.matchNftsToTokenIds(nfts, traitType, traitValue);
  }

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
            attribute?.trait_type === traitType &&
            attribute?.value === traitValue
        );
        return matchingAttributes.length > 0;
      });
      const tokenIds = matchingNfts.map((nft) => nft.id.tokenId);
      return tokenIds;
    } catch (error) {
      throw new Error(`Error matching NFTs to tokenIds: ${error}`);
    }
  }

  private async *fetchTokenIdsForNftsMatchingTrait() {
    let startToken = "";
    let hasNext = true;
    while (hasNext) {
      const response = await this.getNftsForCollectionQuery(startToken);

      yield* response.nfts;
      hasNext = !!response.nextToken;
      startToken = response.nextToken;
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

  private urlQueryHandler = (chain: string) => {
    if (!AvailableChains.includes(chain)) {
      throw new Error(`Chain ${chain} not supported`);
    }
    return `https://${chain}.g.alchemy.com/v2/${this._alchemyAppToken}`;
  };
}
