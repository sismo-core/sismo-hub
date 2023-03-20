import axios from "axios";
import { BeaconResponse, Score } from "./types";
import { FetchedData } from "topics/group";

export class DegenScoreProvider {
  public async getBeaconOwnersWithScore({ score }: Score) {
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
        enrichedData[elem["address"]] = elem["primaryTraits"]["degen_score"];
      });
    } while (cursor);

    // filter for score over preset
    const returnData: FetchedData = {};
    Object.keys(enrichedData).forEach((holder: string) => {
      if (enrichedData[holder] >= score) {
        returnData[holder] = 1;
      }
    });
    return returnData;
  }

  public async getBeaconOwnersWithScoreCount({ score }: Score) {
    const data = await this.getBeaconOwnersWithScore({ score: score });
    return Object.keys(data).length;
  }

  private async getBeacons(cursor: string) {
    const { data: res } = await axios({
      url: "https://beacon.degenscore.com/v1/beacons?limit=200" + cursor,
      method: "get",
    });
    return res;
  }
}
