import { toHex } from "web3-utils";
import {
  GetNftsForCollectionResponse,
  GetOwnersForCollectionParams,
  GetOwnersForCollectionResponse,
  GetOwnersOfTokenIdsParams,
  GetOwnersOfTokenIdsResponse,
  GetOwnerAndTokenBalancesParams,
  GetOwnerAndTokenBalancesResponse,
  GetOwnersOfNftsMatchingTraitParams,
  GetTokenIdsForNftsMatchingTraitParams,
  GetTokenIdsOfContractParams,
  OwnerInfo,
  TokenBalance,
  NFT,
  fromStringToSupportedNetwork,
  SupportedNetwork,
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
    return await this._getOwnersForCollection();
  }

  private async _getOwnersForCollection() {
    let pageKey = "";
    let hasNext = true;
    const ownersList: FetchedData = {};
    while (hasNext) {
      const response = await this._getOwnersForCollectionQuery(pageKey);
      response.ownerAddresses.map((owner) => {
        const tokenBalances = owner.tokenBalances;
        const totalTokenBalance = tokenBalances.reduce((acc, tokenBalance) => {
          return acc + tokenBalance.balance;
        }, 0);
        ownersList[owner.ownerAddress] = totalTokenBalance;
      });
      hasNext = !!response.pageKey;
      pageKey = response.pageKey;
    }
    return ownersList;
  }

  private async _getOwnersForCollectionQuery(
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
   * Retrieves the owners of all NFTs in a collection that match the tokenids
   * @param {Object} params - The parameters for fetching owners by token IDs.
   * @param {string} contractAddress - The address of the NFT contract.
   * @param {string} chain - The name of the blockchain network.
   * @param {string[]} TokenIds -  An array token IDs to fetch owners for.
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object with the owner addresses as keys and a value of 1.
   */
  public async getOwnersOfTokenIds({
    contractAddress,
    chain,
    tokenIds,
  }: GetOwnersOfTokenIdsParams): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    this.contractAddress = contractAddress;
    let groupData: FetchedData = {};
    for (const tokenId of tokenIds) {
      const owners = await this._getOwnersOfTokenId(tokenId);
      groupData = { ...groupData, ...owners };
    }
    return groupData;
  }

  private async _getOwnersOfTokenId(tokenId: string): Promise<FetchedData> {
    let pageKey = "";
    let hasNext = true;
    const ownersList: FetchedData = {};
    while (hasNext) {
      const response = await this._getOwnersOfTokenIdsQuery(pageKey, tokenId);
      for (const owner of response.owners) {
        ownersList[owner] = tokenId;
      }
      hasNext = !!response.pageKey;
      pageKey = response.pageKey;
    }
    return ownersList;
  }

  private async _getOwnersOfTokenIdsQuery(
    pageKey: string,
    tokenId: string
  ): Promise<GetOwnersOfTokenIdsResponse> {
    const url = `${this.baseUrl}/getOwnersForToken?contractAddress=${this.contractAddress}&pageKey=${pageKey}&tokenId=${tokenId}`;
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }

  public async getOwnersOfTokenIdsCount({
    contractAddress,
    chain,
    tokenIds,
  }: GetOwnersOfTokenIdsParams): Promise<number> {
    const data = await this.getOwnersOfTokenIds({
      contractAddress: contractAddress,
      chain: chain,
      tokenIds: tokenIds,
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
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object containing the owners of NFTs matching the specified trait.
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

    return await this.getOwnerAndTokenBalances({
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
   *Fetches owners of NFTs with matching tokenids. This is used internally and is very verbose.
   * @param {Object} params - The parameters for fetching owners by token IDs.
   * @param {string} contractAddress - The address of the contract to query.
   * @param {string} chain - The blockchain network to query.
   * @param {string[]} tokenIds - An array token IDs to fetch owners for.
   * @returns {Promise<FetchedData>} - A promise that resolves to an object mapping owner addresses to the number of token balances they hold.
   */
  private async getOwnerAndTokenBalances({
    tokenIds,
  }: GetOwnerAndTokenBalancesParams): Promise<FetchedData> {
    const owners: OwnerInfo[] = [];
    for await (const owner of this._getOwnerAndTokenBalances()) {
      owners.push(owner);
    }

    return this.filterOwnersByTokenId(owners, tokenIds);
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

  private async *_getOwnerAndTokenBalances() {
    let pageKey = "";
    let hasNext = true;
    while (hasNext) {
      const response = await this._getOwnerAndTokenBalancesQuery(pageKey);
      yield* response.ownerAddresses;
      hasNext = !!response.pageKey;
      pageKey = response.pageKey;
    }
  }

  private async _getOwnerAndTokenBalancesQuery(
    pageKey: string
  ): Promise<GetOwnerAndTokenBalancesResponse> {
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

  private matchNftsToTokenIds(nfts: NFT[], traitType: string, traitValue: string): string[] {
    try {
      const matchingNfts = nfts.filter((nft) => {
        const attributes = nft.metadata.attributes;
        const matchingAttributes = attributes.filter(
          (attribute) => attribute?.trait_type === traitType && attribute?.value === traitValue
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

  /**
   *Fetches the NFT TokenIds from a contract. Can be used in conjunction with getOwnersOfTokenIds to get owners of specific tokenIds.
   * @param {Object} params - The parameters for fetching owners by token IDs.
   * @param {string} contractAddress - The address of the contract to query.
   * @param {string} chain - The blockchain network to query.
   * @returns {Promise<string[]>} - A promise that resolves to an object of tokenids
   */
  public async getTokenIdsOfContract({
    contractAddress,
    chain,
  }: GetTokenIdsOfContractParams): Promise<string[]> {
    this.baseUrl = this.urlQueryHandler(chain);
    this.contractAddress = contractAddress;
    const tokenIds: string[] = [];

    for await (const owner of this._getTokenIdsOfContract()) {
      if (owner.ownerAddress !== "0x0000000000000000000000000000000000000000") {
        owner.tokenBalances.map((token) => tokenIds.push(token.tokenId));
      }
    }
    return tokenIds;
  }

  private async *_getTokenIdsOfContract() {
    let pageKey = "";
    let hasNext = true;

    while (hasNext) {
      const response = await this._getOwnerAndTokenBalancesQuery(pageKey);
      yield* response.ownerAddresses;
      hasNext = !!response.pageKey;
      pageKey = response.pageKey;
    }
  }

  private urlQueryHandler = (chain: string) => {
    const network = fromStringToSupportedNetwork(chain ?? SupportedNetwork.MAINNET);
    return `https://${network}.g.alchemy.com/v2/${this._alchemyAppToken}`;
  };
}
