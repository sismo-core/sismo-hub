import { BigNumber, ethers } from "ethers";
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
    const rawData: FetchedData = await bigQueryProvider.getNftHolders({
      contractAddress,
      snapshot,
    });

    // Filter holders by minAmount
    const data: FetchedData = {};
    for (const key of Object.keys(rawData)) {
      const value = BigNumber.from(rawData[key]);
      if(minAmount) {
        const minAmountBig = BigNumber.from(minAmount);
        if (value.gte(minAmountBig)) {
          data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
        }
      }
      else {
        data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
      }
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
    forcedValue,
    snapshot
  }: {
    contractAddress: string;
    network?: string;
    minAmount?: number;
    forcedValue?: number;
    snapshot?: string;
  }): Promise<FetchedData> {
    
    // Get token decimals
    const rpcProvider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL);
    const abi = [
      "function decimals() public view returns (uint8)",
    ];
    const contract = new ethers.Contract(contractAddress, abi, rpcProvider);
    const tokenDecimals = await contract.decimals();

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
      if(minAmount && tokenDecimals) {
        const minAmountBig = BigNumber.from(minAmount).mul(BigNumber.from(10).pow(tokenDecimals));
        if (value.gte(minAmountBig)) {
          data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
        }
      }
      else {
        data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
      }
    }
    return data;
  }

  public async getERC20HoldersCount({
    contractAddress,
    network,
    snapshot,
  }: {
    contractAddress: string;
    network?: string;
    snapshot?: string;
  }): Promise<number> {
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    return bigQueryProvider.getERC20HoldersCount({
      contractAddress,
      snapshot,
    });
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
    tokenId: string;
    network?: string;
    minAmount?: number;
    forcedValue?: number;
    snapshot?: string;
  }): Promise<FetchedData> {
    const bigQueryProvider = new BigQueryProvider({
      network: fromStringToSupportedNetwork(network ?? SupportedNetwork.MAINNET),
    });
    const rawData: FetchedData = await bigQueryProvider.getERC1155Ownership({
      contractAddress,
      tokenId,
      snapshot,
    });

    const data: FetchedData = {};
    for (const key of Object.keys(rawData)) {
      if (minAmount) {
        if(BigNumber.from(rawData[key]).gte(minAmount)){
          data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
        }
      }
      else if (BigNumber.from(rawData[key]).gt(0)) {
        // console.log(rawData[key]);
        data[key] = forcedValue ?? BigNumber.from(rawData[key]).toString();
      }
    }
    console.log(data);
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
