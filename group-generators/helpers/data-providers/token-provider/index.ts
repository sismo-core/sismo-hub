import { BigNumber } from "ethers";
import { BigQueryProvider } from "@group-generators/helpers/data-providers/big-query/big-query";
import {
  SupportedNetwork,
  fromStringToSupportedNetwork,
} from "@group-generators/helpers/data-providers/big-query/types";
import { FetchedData } from "topics/group";

export class TokenProvider {
  public async getERC721Holders({
    contractAddress,
    network,
    minAmount,
    forcedValue,
    snapshot,
  }: {
    contractAddress: string;
    network?: string;
    minAmount?: number;
    forcedValue?: number;
    snapshot?: string;
  }): Promise<FetchedData> {
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    const rawData: FetchedData = await bigQueryProvider.getERC721Holders({
      contractAddress,
      snapshot,
    });

    // Filter holders by minAmount
    const data: FetchedData = {};
    for (const key of Object.keys(rawData)) {
      const value = BigNumber.from(rawData[key]);
      if (minAmount) {
        const minAmountBig = BigNumber.from(minAmount);
        if (value.gte(minAmountBig)) {
          data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
        }
      } else {
        data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
      }
    }
    return data;
  }

  public async getERC721HoldersCount({
    contractAddress,
    network,
    minAmount,
    snapshot,
  }: {
    contractAddress: string;
    network?: string;
    minAmount?: number;
    snapshot?: string;
  }): Promise<number> {
    const data = await this.getERC721Holders({
      contractAddress,
      network,
      minAmount,
      snapshot,
    });
    return Object.keys(data).length;
  }

  public async getERC20Holders({
    contractAddress,
    network,
    minAmount,
    forcedValue,
    snapshot,
  }: {
    contractAddress: string;
    network?: string;
    minAmount?: string;
    forcedValue?: number;
    snapshot?: string;
  }): Promise<FetchedData> {
    // Get token holders
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    const rawData: FetchedData = await bigQueryProvider.getERC20Holders({
      contractAddress,
      snapshot,
    });

    // Filter holders by minAmount
    const data: FetchedData = {};
    for (const key of Object.keys(rawData)) {
      const value = BigNumber.from(rawData[key]);
      if (minAmount) {
        if (value.gte(BigNumber.from(minAmount))) {
          data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
        }
      } else {
        data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
      }
    }
    return data;
  }

  public async getERC20HoldersCount({
    contractAddress,
    network,
    minAmount,
    snapshot,
  }: {
    contractAddress: string;
    network?: string;
    minAmount?: string;
    snapshot?: string;
  }): Promise<number> {
    const data = await this.getERC20Holders({
      contractAddress,
      network,
      minAmount,
      snapshot,
    });
    return Object.keys(data).length;
  }

  public async getERC1155Holders({
    contractAddress,
    tokenId,
    network,
    minAmount,
    forcedValue,
    snapshot,
  }: {
    contractAddress: string;
    tokenId?: string;
    network?: string;
    minAmount?: number;
    forcedValue?: number;
    snapshot?: string;
  }): Promise<FetchedData> {
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    const rawData: FetchedData = await bigQueryProvider.getERC1155Holders({
      contractAddress,
      tokenId,
      snapshot,
    });

    const data: FetchedData = {};
    for (const key of Object.keys(rawData)) {
      if (minAmount) {
        if (BigNumber.from(rawData[key]).gte(minAmount)) {
          data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
        }
      } else if (BigNumber.from(rawData[key]).gt(0)) {
        data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
      }
    }
    return data;
  }

  public async getERC1155HoldersCount({
    contractAddress,
    tokenId,
    network,
    minAmount,
    snapshot,
  }: {
    contractAddress: string;
    tokenId?: string;
    network?: string;
    minAmount?: number;
    snapshot?: string;
  }): Promise<number> {
    const data = await this.getERC1155Holders({
      contractAddress,
      tokenId,
      network,
      minAmount,
      snapshot,
    });
    return Object.keys(data).length;
  }
}
