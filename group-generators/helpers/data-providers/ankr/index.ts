import axios from "axios";
import {
  AnkrTokenQueryParam,
  AnkrTokenQueryResponse,
  Chains,
  TokenInfo,
} from "./types";
import { FetchedData } from "topics/group";

export class AnkrProvider {
  url: string;
  headers: {
    "Content-Type": string;
  };

  public constructor() {
    this.url = `https://rpc.ankr.com/multichain/${process.env.ANKR_API_KEY}`;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  public async getNftHolders({
    network,
    address,
  }: TokenInfo): Promise<FetchedData> {
    const returnData: FetchedData = {};
    
    this.checkArgsValidity(network, address);

    const tokenRequestParams: AnkrTokenQueryParam = {
      id: 1,
      jsonrpc: "2.0",
      method: "ankr_getNFTHolders",
      params: {
        blockchain: network,
        contractAddress: address,
        pageSize: 1000,
        pageToken: "",
      },
    };

    do {
      const data: AnkrTokenQueryResponse = await this.getHolders(
        tokenRequestParams
      );

      // check if data is undefined
      if(!data || !data.result) {
        throw new Error(
          `The fetched data is undefined
          Check if your ANKR_API_KEY is defined in your .env file
          Go to https://www.ankr.com/rpc/advanced-api to get your API key
          You can also check if the contract address is correct`
        );
      }
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
    } while (tokenRequestParams.params.pageToken);

    return returnData;
  }

  public async getTokenHolders({
    network,
    address,
  }: TokenInfo): Promise<FetchedData> {
    const returnData: FetchedData = {};

    this.checkArgsValidity(network, address);

    const tokenRequestParams: AnkrTokenQueryParam = {
      id: 1,
      jsonrpc: "2.0",
      method: "ankr_getTokenHolders",
      params: {
        blockchain: network,
        contractAddress: address,
        pageSize: 1000,
        pageToken: "",
      },
    };

    do {
      const data: AnkrTokenQueryResponse = await this.getHolders(
        tokenRequestParams
      );

      // check if data is undefined
      if(!data || !data.result) {
        throw new Error(
          `The fetched data is undefined
          Check if your ANKR_API_KEY is defined in your .env file
          Go to https://www.ankr.com/rpc/advanced-api to get your API key
          You can also check if the contract address is correct`
        );
      }
      // Check if there is a next page
      if (Object.values(data.result).length > 0) {
        tokenRequestParams.params.pageToken = data.result.nextPageToken;
      } else {
        tokenRequestParams.params.pageToken = "";
      }

      data.result.holders.map(async (elem: any) => {
        returnData[elem.holderAddress] = 1;
      });
    } while (tokenRequestParams.params.pageToken);

    return returnData;
  }

  public async getTokenHoldersCount(tokenInfo: TokenInfo) {
    const holders = await this.getTokenHolders(tokenInfo);
    return Object.keys(holders).length;
  }

  public async getNftHoldersCount(tokenInfo: TokenInfo) {
    const holders = await this.getNftHolders(tokenInfo);
    return Object.keys(holders).length;
  }

  private async getHolders(
    options: AnkrTokenQueryParam
  ): Promise<AnkrTokenQueryResponse> {
    const { data: res } = await axios.post(this.url, options, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  }

  private checkArgsValidity(network: string, address: string) {
    const regex =/^0x[0-9a-fA-F]{40}$/;
    if(!regex.test(address)){
      throw new Error(
        `This is not a valid contract address`
      );
    }

    if(!Object.values(Chains).includes(network)){
      throw new Error(
        `This network is not supported`
      );
    }
  }
}
