import axios from "axios";
// eslint-disable-next-line no-restricted-imports
import { TokenHolder } from "../transpose/types";
//import { FetchedData } from "topics/group";
import { UserBeaconData } from "./types";

export class DegenScoreProvider {
  url: string;
  headers: {
    authorization: string;
    accept: string;
  };

  public async getTokenHolders(): Promise<TokenHolder[]> {
    const { data: res } = await axios({
      url:
        "https://api.etherscan.io/api?module=token&action=tokenholderlist&contractaddress=0x0521FA0bf785AE9759C7cB3CBE7512EbF20Fbdaa&page=1&offset=10&apikey=" +
        process.env.ETHERSCAN_API_KEY,
      method: "get",
    });
    return res.result;
  }

  public async getBeaconDataForHolders(): Promise<UserBeaconData[]> {
    const tokenholders: TokenHolder[] = await this.getTokenHolders();

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

  public async getBeaconHolders(score: string /*, trait: string*/) {
    const userBeaconData: UserBeaconData[] =
      await this.getBeaconDataForHolders();

    const filter = userBeaconData.filter((elem: any) => {
      elem["quantity"] >= score;
    });
    return filter;
  }
}
