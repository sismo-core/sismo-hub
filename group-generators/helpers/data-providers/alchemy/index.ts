// import axios from "axios";
// import { FetchedData } from "topics/group";

export class AlchemyProvider {
  url: string;
  private _alchemyAppToken: string | undefined;

  constructor(alchemyAppToken = process.env.ALCHEMY_API_KEY) {
    this.url = `https://eth-mainnet.g.alchemy.com/nft/v2/`;
    this._alchemyAppToken = alchemyAppToken;
  }

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
