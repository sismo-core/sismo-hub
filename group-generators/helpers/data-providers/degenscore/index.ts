import axios from "axios";
// eslint-disable-next-line no-restricted-imports
import { TokenHolder } from "../transpose/types";
import { UserBeaconData } from "./types";
import { FetchedData } from "topics/group";

export class DegenScoreProvider {
  url: string;
  headers: {
    authorization: string;
    accept: string;
  };

  public async getBeaconHolders(apiKey: string, score: string, trait: string) {
    const userBeaconData: UserBeaconData[] = await this.getBeaconDataForHolders(
      apiKey
    );

    const result: FetchedData = {};

    userBeaconData.map((elem: any) => {
      if (elem["quantity"] >= score) {
        elem["beaconData"]["traits"].forEach((traitElem: any) => {
          if (traitElem["traitType"] == trait) {
            result[elem["owner_address"]] = 1;
          }
        });
      }
    });
    return result;
  }

  private async getBeaconDataForHolders(
    apiKey: string
  ): Promise<UserBeaconData[]> {
    const tokenholders: TokenHolder[] = await this.getTokenHolders(apiKey);

    const userBeaconData: any[] = [];

    tokenholders.forEach(async (holder) => {
      const { data: res } = await axios({
        url: "https://beacon.degenscore.com/v1/beacon/" + holder.owner_address,
        method: "get",
      });
      userBeaconData.push({
        owner_address: holder.owner_address,
        quantity: holder.balance,
        beaconData: res,
      });
    });
    return userBeaconData;
  }

  private async getTokenHolders(apiKey: string): Promise<TokenHolder[]> {
    const { data: res } = await axios({
      url:
        "https://api.etherscan.io/api?module=token&action=tokenholderlist&contractaddress=0x0521FA0bf785AE9759C7cB3CBE7512EbF20Fbdaa&page=1&offset=10&apikey=" +
        apiKey,
      method: "get",
    });
    return res.result;
  }
}
