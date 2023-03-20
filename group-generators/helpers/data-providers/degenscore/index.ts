import axios from "axios";
// import { ethers } from "ethers";
import { BeaconResponse, Score } from "./types";
import { FetchedData } from "topics/group";

export class DegenScoreProvider {
  // url: string;
  // headers: {
  //   authorization: string;
  //   accept: string;
  // };

  // provider: ethers.providers.JsonRpcProvider;

  constructor() {
    // this.provider = new ethers.providers.JsonRpcProvider(
    //   "https://eth.llamarpc.com"
    // );
  }

  public async getBeaconOwnersWithScore({ _score }: Score) {
    // fetch Beacons from API
    const enrichedData: any = {};
    let cursor = "";
    do {
      const data: BeaconResponse = await this.getBeacons(cursor);

      // Check if there is a next cursor
      if (Object.values(data["meta"]).length > 0) {
        cursor = "&cursor=" + data["meta"]["nextCursor"];
      } else {
        cursor = "";
      }

      // Add holder of each beacon
      data["beacons"].map(async (elem: any) => {
        // const holder = await this.getTokenHolder(elem["address"]);
        // enrichedData[holder] = elem["primaryTraits"]["degen_score"];
        enrichedData[elem["address"]] = elem["primaryTraits"]["degen_score"];
      });
    } while (cursor);

    // filter for score over preset
    const returnData: FetchedData = {};
    Object.keys(enrichedData).forEach((holder: string) => {
      if (enrichedData[holder] >= _score) {
        returnData[holder] = 1;
      }
    });
    return returnData;
  }

  public async getBeaconOwnersWithScoreCount({ _score }: Score) {
    const data = await this.getBeaconOwnersWithScore({ _score: _score });
    return Object.keys(data).length;
  }

  private async getBeacons(cursor: string) {
    const { data: res } = await axios({
      url: "https://beacon.degenscore.com/v1/beacons?limit=200" + cursor,
      method: "get",
    });
    return res;
  }

  // private async getTokenHolder(beaconId: number): Promise<string> {
  //   const abi = [
  //     "function ownerOfBeacon(uint128) public view returns (string)",
  //   ];
  //   const beaconInterface = new ethers.utils.Interface(abi);
  //   const beaconRequestData = beaconInterface.encodeFunctionData(
  //     "ownerOfBeacon",
  //     [beaconId]
  //   );
  //   const tokenHolder = await this.provider.send("eth_call", [
  //     {
  //       to: "0x0521FA0bf785AE9759C7cB3CBE7512EbF20Fbdaa",
  //       data: beaconRequestData,
  //     },
  //   ]);
  //   return tokenHolder;
  // }
}
