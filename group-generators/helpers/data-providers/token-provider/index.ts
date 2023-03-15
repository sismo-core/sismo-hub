import { BigNumber } from "ethers";
import { BigQueryProvider } from "@group-generators/helpers/data-providers/big-query/big-query";
import {
  SupportedNetwork,
  fromStringToSupportedNetwork,
} from "@group-generators/helpers/data-providers/big-query/types";
import { FetchedData } from "topics/group";

export class TokenProvider {
  public async getNftHolders({
    contractAddress,
    network,
  }: {
    contractAddress: string;
    network?: string;
  }): Promise<FetchedData> {
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    const rawData: FetchedData = await bigQueryProvider.getNftHolders({
      contractAddress,
    });

    const data: FetchedData = {};
    for (const key of Object.keys(rawData)) {
      data[key] = 1;
    }
    return data;
  }

  public async getNftHoldersCount({
    contractAddress,
    network,
  }: {
    contractAddress: string;
    network?: string;
  }): Promise<number> {
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    return bigQueryProvider.getNftHoldersCount({
      contractAddress,
    });
  }

  public async getERC20Holders({
    contractAddress,
    network,
    minAmount,
    tokenDecimals,
  }: {
    contractAddress: string;
    network?: string;
    minAmount?: number;
    tokenDecimals?: number;
  }): Promise<FetchedData> {
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    const rawData: FetchedData = await bigQueryProvider.getERC20Holders({
      contractAddress,
    });

    const data: FetchedData = {};
    for (const key of Object.keys(rawData)) {
      if (minAmount && Number(rawData[key]) >= minAmount * Number(`1e${tokenDecimals}`)) {
        data[key] = 1;
      }

      if (!minAmount) {
        data[key] = 1;
      }
    }
    return data;
  }

  public async getERC20HoldersCount({
    contractAddress,
    network,
  }: {
    contractAddress: string;
    network?: string;
  }): Promise<number> {
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    return bigQueryProvider.getERC20HoldersCount({
      contractAddress,
    });
  }

  public async getERC1155Holders({
    contractAddress,
    tokenId,
    network,
  }: {
    contractAddress: string;
    tokenId: string;
    network?: string;
  }): Promise<FetchedData> {
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    const rawData: FetchedData = await bigQueryProvider.getERC1155Ownership({
      contractAddress,
      tokenId,
    });

    const data: FetchedData = {};
    for (const key of Object.keys(rawData)) {
      if (BigNumber.from(rawData[key]).gte(0)) {
        data[key] = 1;
      }
    }
    return data;
  }

  public async getERC1155HoldersCount({
    contractAddress,
    tokenId,
    network,
  }: {
    contractAddress: string;
    tokenId: string;
    network: string;
  }): Promise<string> {
    fromStringToSupportedNetwork(network ?? "mainnet");
    return `"Contract ${contractAddress} with tokenId ${tokenId} succesfully selected on network ${network}."`;
  }
}
