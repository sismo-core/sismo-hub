import axios from "axios";
import { BigNumber } from "ethers";
import {
  AnkrTokenQueryParam,
  AnkrTokenQueryResponse,
  SupportedNetwork,
  TokenInfo,
  fromStringToSupportedNetwork,
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

  public async getNftHolders({ network, address }: TokenInfo): Promise<FetchedData> {
    const returnData: FetchedData = {};

    const networkVerified = this.checkArgsValidity(network, address);

    const tokenRequestParams: AnkrTokenQueryParam = {
      id: 1,
      jsonrpc: "2.0",
      method: "ankr_getNFTHolders",
      params: {
        blockchain: networkVerified,
        contractAddress: address,
        pageSize: 1000,
        pageToken: "",
      },
    };

    do {
      const data: AnkrTokenQueryResponse = await this.getHolders(tokenRequestParams);

      // check if data is undefined
      if (!data || !data.result) {
        throw new Error(
          `The fetched data is undefined\nCheck if your ANKR_API_KEY is defined in your .env file\nGo to https://www.ankr.com/rpc/advanced-api to get your API key`
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

  public async getTokenHolders({ network, address }: TokenInfo): Promise<FetchedData> {
    const returnData: FetchedData = {};

    const networkVerified = this.checkArgsValidity(network, address);

    const tokenRequestParams: AnkrTokenQueryParam = {
      id: 1,
      jsonrpc: "2.0",
      method: "ankr_getTokenHolders",
      params: {
        blockchain: networkVerified,
        contractAddress: address,
        pageSize: 1000,
        pageToken: "",
      },
    };

    do {
      const data: AnkrTokenQueryResponse = await this.getHolders(tokenRequestParams);
      const tokenDecimals = data.result.tokenDecimals;

      // check if data is undefined
      if (!data || !data.result) {
        throw new Error(
          `The fetched data is undefined\nCheck if your ANKR_API_KEY is defined in your .env file\nGo to https://www.ankr.com/rpc/advanced-api to get your API key`
        );
      }
      // Check if there is a next page
      if (Object.values(data.result).length > 0) {
        tokenRequestParams.params.pageToken = data.result.nextPageToken;
      } else {
        tokenRequestParams.params.pageToken = "";
      }

      data.result.holders.map(async (elem: any) => {
        const balance = elem.balance;
        // if there is a decimal in the balance
        if (balance.split(".").length > 1) {
          const balanceDecimals = balance.split(".")[1].length;
          const balanceWithDecimalsJoined = balance.replace(".", "");
          returnData[elem.holderAddress] = BigNumber.from(balanceWithDecimalsJoined)
            .mul(BigNumber.from(10).pow(tokenDecimals - balanceDecimals))
            .toString();
        } else {
          returnData[elem.holderAddress] = BigNumber.from(balance)
            .mul(BigNumber.from(10).pow(tokenDecimals))
            .toString();
        }
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

  private async getHolders(options: AnkrTokenQueryParam): Promise<AnkrTokenQueryResponse> {
    const { data: res } = await axios.post(this.url, options, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  }

  private checkArgsValidity(chain: string, address: string): string {
    const regex = /^0x[0-9a-fA-F]{40}$/;
    if (!regex.test(address)) {
      throw new Error(
        `The address: ${address} is not valid, verify if there is a 0x at the beginning or if the address is 40 characters long`
      );
    }

    const network = fromStringToSupportedNetwork(chain);

    if (!network) {
      throw new Error(
        `The network: ${chain} is not supported\nThe following networks are supported : ${Object.values(
          SupportedNetwork
        )}`
      );
    }

    return network;
  }
}
