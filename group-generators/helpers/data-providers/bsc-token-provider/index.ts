import axios from "axios";
import { BscTokenQueryParam, BscTokenQueryResponse, Token } from "./types";
import { FetchedData } from "topics/group";

export class BscTokenProvider {
  url: string;
  headers: {
    "Content-Type": string;
  };

  public constructor() {
    this.url = "https://rpc.ankr.com/multichain/";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  public async getNftHolders({ address }: Token): Promise<FetchedData> {
    const returnData: FetchedData = {};

    const tokenRequestParams: BscTokenQueryParam = {
      id: 1,
      jsonrpc: "2.0",
      method: "ankr_getNFTHolders",
      params: {
        blockchain: "bsc",
        contractAddress: address,
        pageSize: 1000,
        pageToken: "",
      },
    };

    do {
      const data: BscTokenQueryResponse = await this.getHolders(
        tokenRequestParams
      );

      console.log(data);
      // Check if there is a next page
      if (Object.values(data.result).length > 0) {
        tokenRequestParams.params.pageToken = data.result.nextPageToken
          ? data.result.nextPageToken
          : "";
      } else {
        tokenRequestParams.params.pageToken = "";
      }

      data.result.holders.map(async (elem: any) => {
        returnData[elem] = 1;
      });

      // timeout to limit request rate to avoid error 429
      await new Promise((f) => setTimeout(f, 1201));
    } while (tokenRequestParams.params.pageToken);

    console.log(returnData);
    return returnData;
  }

  public async getTokenHolders({ address }: Token): Promise<FetchedData> {
    const returnData: FetchedData = {};

    const tokenRequestParams: BscTokenQueryParam = {
      id: 1,
      jsonrpc: "2.0",
      method: "ankr_getTokenHolders",
      params: {
        blockchain: "bsc",
        contractAddress: `${address}`,
        pageSize: 1000,
        pageToken: "",
      },
    };

    do {
      const data: BscTokenQueryResponse = await this.getHolders(
        tokenRequestParams
      );

      // Check if there is a next page
      if (Object.values(data.result).length > 0) {
        tokenRequestParams.params.pageToken = data.result.nextPageToken;
      } else {
        tokenRequestParams.params.pageToken = "";
      }

      data.result.holders.map(async (elem: any) => {
        returnData[elem] = 1;
      });
      // timeout to limit request rate lower 50req/min
      await new Promise((f) => setTimeout(f, 1201));
    } while (tokenRequestParams.params.pageToken);

    return returnData;
  }

  public async getTokenHoldersCount({ address }: Token) {
    const holders = await this.getTokenHolders({ address });
    return Object.keys(holders).length;
  }

  public async getNftHoldersCount({ address }: Token) {
    const holders = await this.getNftHolders({ address });
    return Object.keys(holders).length;
  }

  private async getHolders(
    options: BscTokenQueryParam
  ): Promise<BscTokenQueryResponse> {
    const { data: res } = await axios.post(this.url, options, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  }
}
