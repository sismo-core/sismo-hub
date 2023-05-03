import {
  availableChains,
  GetOwnersForCollectionSimpleInput,
  GetOwnersForCollectionSimpleOutput,
  GetOwnersForCollectionInput,
  GetOwnersForCollectionOutput,
  OwnerInfo,
  TokenBalance,
} from "./types";
import { FetchedData } from "topics/group";

export class AlchemyProvider {
  baseUrl: string;
  contractAddress: string;
  private _alchemyAppToken: string | undefined;

  constructor(alchemyAppToken = process.env.ALCHEMY_API_KEY) {
    this._alchemyAppToken = alchemyAppToken;
  }

  //getOwnersForCollection + chain selector
  // - contractAddress
  // - chain
  public async getOwnersForCollectionSimple({
    contractAddress,
    chain,
  }: GetOwnersForCollectionSimpleInput): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    const url = `${this.baseUrl}/getOwnersForCollection?contractAddress=${contractAddress}&withTokenBalances=false`;
    const response = await fetch(url);
    const addresses: GetOwnersForCollectionSimpleOutput = await response.json();
    const sismoData: FetchedData = {};

    for (const address of addresses.ownerAddresses) {
      sismoData[address] = 1;
    }
    return sismoData;
  }

  //OwnerForCollectionInput
  //getOwnersOfNFTTokenId's
  // - contractAddress
  // - chain
  // - tokenId's []

  public async getOwnersForCollection({
    contractAddress,
    chain,
    tokenIds,
  }: GetOwnersForCollectionInput): Promise<FetchedData> {
    this.baseUrl = this.urlQueryHandler(chain);
    this.contractAddress = contractAddress;

    const owners: OwnerInfo[] = [];
    for await (const owner of this._getOwnersForCollection()) {
      owners.push(owner);
    }

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
  }

  private async *_getOwnersForCollection() {
    let pageKey = "";
    let hasNext = true;
    while (hasNext) {
      const response = await this.getOwnersForCollectionQuery(pageKey);
      console.log(`here`);

      yield* response.ownerAddresses;
      hasNext = !!response.pageKey; // Assign value based on presence of page key
      pageKey = response.pageKey;
    }
  }

  private async getOwnersForCollectionQuery(
    pageKey: string
  ): Promise<GetOwnersForCollectionOutput> {
    const url = `${this.baseUrl}/getOwnersForCollection?contractAddress=${this.contractAddress}&withTokenBalances=true&pageKey=${pageKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(
          `Error fetching data from ${url}: ${response.statusText}`
        );
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

  //getNFTsForCollection + chain selector
  // - contractAddress
  // - chain

  //NftForCollectionInput
  // - contractAddress
  // - chain
  // - traitType
  // - traitValue

  //OwnerForCollectionInput
  //getOwnersOfNFTTokenId's
  // - contractAddress
  // - chain
  // - tokenId's []
}
