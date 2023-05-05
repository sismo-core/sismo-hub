import axios from "axios";
import { Safe, SafeAddress } from "./types";
import { FetchedData } from "topics/group";

export class SafeProvider {
  url: string;

  public constructor() {
    this.url = "https://safe-transaction-mainnet.safe.global/api";
  }

  private async getSafe(endpoint: string): Promise<Safe> {
    const { data: res } = await axios({
      url: this.url + endpoint,
      method: "get",
    });
    return res;
  }

  public async getSafeOwners({
    safeAddress,
  }: SafeAddress): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    let ownersAddress: string[];
    try {
      const req: Safe = await this.getSafe(
        "/v1/safes/" + safeAddress
      );
      ownersAddress = req.owners;
    } catch (error) {
      throw new Error("Error fetching total number of owners: " + error);
    }

    await Promise.all(ownersAddress).then((addresses) => {
      addresses.forEach((address) => {
        if (address != "") {
          dataProfiles[address] = 1;
        }
      });
    });

    return dataProfiles;
  }

  public async getSafeOwnersCount({
    safeAddress,
  }: SafeAddress): Promise<number> {
    const owners = await this.getSafeOwners({ safeAddress });
    return Object.keys(owners).length;
  }
}
