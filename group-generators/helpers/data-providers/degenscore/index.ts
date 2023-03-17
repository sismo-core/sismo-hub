import axios from "axios";
// eslint-disable-next-line no-restricted-imports
import { ethers } from "ethers";
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-unused-vars
import { BeaconResponse } from "./types";
import { FetchedData } from "topics/group";

export class DegenScoreProvider {
  url: string;
  headers: {
    authorization: string;
    accept: string;
  };

  provider: ethers.providers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      process.env.JSON_RPC_URL
    );
  }

  public async getBeaconOwnersWithScore(_score: number) {
    // fetch Beacons from API
    const data: BeaconResponse = await this.getBeacons();

    const enrichedData: any = {};

    // Add holder of each beacon
    data["beacons"].map(async (elem: any) => {
      const holder = await this.getTokenHolder(elem["address"]);
      enrichedData[holder] = elem["primaryTraits"]["degen_score"];
    });

    // filter for score over preset
    const returnData: FetchedData = {};
    Object(enrichedData)
      .keys()
      .forEach((holder: string) => {
        if (enrichedData[holder] >= _score) {
          returnData[holder] = 1;
        }
      });
  }

  public async getBeaconOwnersWithScoreCount(_score: number) {
    const data: BeaconResponse = await this.getBeacons();

    const enrichedData: any = {};

    data["beacons"].map(async (elem: any) => {
      const holder = await this.getTokenHolder(elem["address"]);
      enrichedData[holder] = elem["primaryTraits"]["degen_score"];
    });

    const returnData: FetchedData = {};
    Object(enrichedData)
      .keys()
      .forEach((holder: string) => {
        if (enrichedData[holder] >= _score) {
          returnData[holder] = 1;
        }
      });
  }

  private async getBeacons() {
    const { data: res } = await axios({
      url: "https://beacon.degenscore.com/v1/beacons/",
      method: "get",
    });
    return res;
  }

  private async getTokenHolder(beaconId: number): Promise<string> {
    const abi = [
      "function ownerOfBeacon(uint128) public view returns (string)",
    ];
    const beaconInterface = new ethers.utils.Interface(abi);
    const beaconRequestData = beaconInterface.encodeFunctionData(
      "ownerOfBeacon",
      [beaconId]
    );
    const tokenHolder = await this.provider.send("eth_call", [
      {
        to: "0x0521FA0bf785AE9759C7cB3CBE7512EbF20Fbdaa",
        data: beaconRequestData,
      },
    ]);
    return tokenHolder;
  }
}
