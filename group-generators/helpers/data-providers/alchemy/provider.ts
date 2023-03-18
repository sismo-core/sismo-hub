import axios from "axios";
import { QueryCollectionOwnersInput } from "./types";
import { FetchedData } from "topics/group";

export class AlchemyProvider {
  url: string;
  private _alchemyAppToken: string | undefined;
  constructor(alchemyAppToken = process.env.ALCHEMY_API_KEY) {
    this.url = "https://eth-mainnet.g.alchemy.com/nft/v2/";
    this._alchemyAppToken = alchemyAppToken;
  }

  public async queryCollectionOwners({
    contractAddress,
  }: QueryCollectionOwnersInput): Promise<FetchedData> {
    const fetchedData: { [address: string]: number } = {};
    const res = await axios({
      url: `${this.url}${this._alchemyAppToken}/getOwnersForCollection`,
      method: "get",
      params: { contractAddress },
    });

    res.data.ownerAddresses?.map(
      (address: string) => (fetchedData[address] = 1)
    );
    return fetchedData;
  }

  public async queryCollectionOwnersCount({
    contractAddress,
  }: QueryCollectionOwnersInput): Promise<number> {
    const holders = await this.queryCollectionOwners({ contractAddress });
    return Object.keys(holders).length;
  }
}
