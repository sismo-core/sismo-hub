import { toHex } from "web3-utils";
import {
  AvailableChains,
  GetNftsForCollectionResponse,
  GetOwnersForCollectionParams,
  GetOwnersForCollectionResponse,
  GetOwnersForOneTokenIdParams,
  GetOwnersForOneTokenIdResponse,
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

  /**
   * Retrieves the owners of all NFTs for a given collection.
   * @param {Object} params - The parameters for fetching owners by token IDs.
   * @param {string} contractAddress - The address of the NFT contract.
   * @param {string} chain - The name of the blockchain network.
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object with the owner addresses as keys and a value of 1.
   */
  public async getOwnersForCollection({
    contractAddress,
    chain,
  }: GetOwnersForCollectionParams): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    this.contractAddress = contractAddress;
    const groupData: FetchedData = {};
    const owners = await this._getOwnersForCollection();
    for (const owner of owners) {
      groupData[owner] = 1;
    }
    return groupData;
  }

  private async _getOwnersForCollection() {
    let pageKey = "";
    let hasNext = true;
    const ownersList: string[] = [];
    while (hasNext) {
      const response = await this._getOwnersForCollectionQuery(pageKey);
      ownersList.push(...response.ownerAddresses);
      hasNext = !!response.pageKey;
      pageKey = response.pageKey;
    }
    return ownersList;
  }

  private async _getOwnersForCollectionQuery(
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

  public async getOwnersForCollectionCount({
    contractAddress,
    chain,
  }: GetOwnersForCollectionParams): Promise<number> {
    const data = await this.getOwnersForCollection({
      contractAddress: contractAddress,
      chain: chain,
    });
    return Object.keys(data).length;
  }

  /**
   * Retrieves the owners of all NFTs in a collection that match a tokenId
   * @param {Object} params - The parameters for fetching owners by token IDs.
   * @param {string} contractAddress - The address of the NFT contract.
   * @param {string} chain - The name of the blockchain network.
   * @param {string} TokenId - The tokenId of the NFT to search for.
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object with the owner addresses as keys and a value of 1.
   */
  public async getOwnersForOneTokenId({
    contractAddress,
    chain,
    tokenId,
  }: GetOwnersForOneTokenIdParams): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    this.contractAddress = contractAddress;
    const groupData: FetchedData = {};
    const owners = await this._getOwnersForOneTokenId(tokenId);
    for (const owner of owners) {
      groupData[owner] = 1;
    }
    return groupData;
  }

  private async _getOwnersForOneTokenId(tokenId: string) {
    let pageKey = "";
    let hasNext = true;
    const ownersList: string[] = [];
    while (hasNext) {
      const response = await this._getOwnersForOneTokenIdQuery(
        pageKey,
        tokenId
      );
      ownersList.push(...response.owners);
      hasNext = !!response.pageKey;
      pageKey = response.pageKey;
    }
    return ownersList;
  }

  private async _getOwnersForOneTokenIdQuery(
    pageKey: string,
    tokenId: string
  ): Promise<GetOwnersForOneTokenIdResponse> {
    const url = `${this.baseUrl}/getOwnersForToken?contractAddress=${this.contractAddress}&pageKey=${pageKey}&tokenId=${tokenId}`;
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }

  public async _getOwnersForOneTokenIdCount({
    contractAddress,
    chain,
    tokenId,
  }: GetOwnersForOneTokenIdParams): Promise<number> {
    const data = await this.getOwnersForOneTokenId({
      contractAddress: contractAddress,
      chain: chain,
      tokenId: tokenId,
    });
    return Object.keys(data).length;
  }

  /**
   * Fetches the owners of all NFTs with a matching trait for the given contract and trait.
   * @param {Object} params - The parameters for fetching owners by token IDs.
   * @param {string} contractAddress - The address of the NFT contract.
   * @param {string} chain - The name of the blockchain network.
   * @param {string} traitType - The type of the trait to search for.
   * @param {string} traitValue - The value of the trait to search for.
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object containing the number of NFTs owned by each address.
   */
  public async getOwnersOfNftsMatchingTrait({
    contractAddress,
    chain,
    traitType,
    traitValue,
  }: GetOwnersOfNftsMatchingTraitParams): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    this.contractAddress = contractAddress;

    const tokenIds = await this._getTokenIdsForNftsMatchingTrait({
      traitType,
      traitValue,
    });

    return await this.getOwnersByTokenIds({
      tokenIds,
    });
  }

  public async getOwnersOfNftsMatchingTraitCount({
    contractAddress,
    chain,
    traitType,
    traitValue,
  }: GetOwnersOfNftsMatchingTraitParams): Promise<number> {
    const data = await this.getOwnersOfNftsMatchingTrait({
      contractAddress: contractAddress,
      chain: chain,
      traitType: traitType,
      traitValue: traitValue,
    });
    return Object.keys(data).length;
  }

  /**
   *Fetches owners of NFTs with a matching tokenid
   * @param {Object} params - The parameters for fetching owners by token IDs.
   * @param {string} contractAddress - The address of the contract to query.
   * @param {string} chain - The blockchain network to query.
   * @param {string[]} tokenIds - An array of ERC-1155 token IDs to fetch owners for.
   * @returns {Promise<FetchedData>} - A promise that resolves to an object mapping owner addresses to the number of token balances they hold.
   */
  private async getOwnersByTokenIds({
    contractAddress,
    chain,
    tokenIds,
  }: GetOwnersByTokenIdsParams): Promise<FetchedData> {
    if (contractAddress && chain) {
      this.baseUrl = this.urlQueryHandler(chain);
      this.contractAddress = contractAddress;
    }

    const owners: OwnerInfo[] = [];
    for await (const owner of this._getOwnersByTokenIds()) {
      owners.push(owner);
    }

    return this.filterOwnersByTokenId(owners, tokenIds);
  }

  public async getOwnersByTokenIdsCount({
    contractAddress,
    chain,
    tokenIds,
  }: GetOwnersByTokenIdsParams): Promise<number> {
    const data = await this.getOwnersByTokenIds({
      contractAddress: contractAddress,
      chain: chain,
      tokenIds: tokenIds,
    });
    return Object.keys(data).length;
  }

  private async filterOwnersByTokenId(
    owners: OwnerInfo[],
    tokenIds: string[]
  ): Promise<FetchedData> {
    const formattedTokenIds = tokenIds.map((tokenId) => {
      if (!tokenId.startsWith("0x")) {
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

      const groupData: FetchedData = {};
      for (const address of addresses) {
        groupData[address.ownerAddress] = address.tokenBalances.length;
      }
      return groupData;
    } catch (error) {
      throw new Error(`Error filtering owners by tokenIds: ${error}`);
    }
  }

  private async *_getOwnersByTokenIds() {
    let pageKey = "";
    let hasNext = true;
    while (hasNext) {
      const response = await this._getOwnersByTokenIdsQuery(pageKey);
      yield* response.ownerAddresses;
      hasNext = !!response.pageKey; // Assign value based on presence of page key
      pageKey = response.pageKey;
    }
  }

  private async _getOwnersByTokenIdsQuery(
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

  private async _getTokenIdsForNftsMatchingTrait({
    traitType,
    traitValue,
  }: GetTokenIdsForNftsMatchingTraitParams): Promise<string[]> {
    const nfts: NFT[] = [];
    for await (const nft of this._getTokenIdsForNftsMatchingTraits()) {
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

  private async *_getTokenIdsForNftsMatchingTraits() {
    let startToken = "";
    let hasNext = true;
    while (hasNext) {
      const response = await this._getNftsForCollectionQuery(startToken);

      yield* response.nfts;
      hasNext = !!response.nextToken;
      startToken = response.nextToken;
    }
  }

  private async _getNftsForCollectionQuery(
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
