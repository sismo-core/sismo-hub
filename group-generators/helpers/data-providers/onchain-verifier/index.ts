import { ethers } from "ethers";
import { ContractConfig } from "./types";
import { FetchedData } from "topics/group";

export class OnchainVerifier {

  /**
   * Use this method to call the getApprovedAddresses method on an deployed instance of the OnchainVerifier Contract
   * @param contractAddress The address where the contract is deployed
   * @param network The network where the contract is deployed
   * @returns The data returned from the contract in FetchData type { [address: string]: number }
   */
  public async getApprovedAddresses({
    mergedArguments
    // contractAddress,
    // network,
  }: ContractConfig): Promise<FetchedData> {
    const [ network, contractAddress ] = mergedArguments.split(",");

    const provider = ethers.getDefaultProvider(network);

    const contract = new ethers.Contract(contractAddress, abi, provider);

    const approvedAddressesResponse = await contract.getApprovedAddresses();
    const approvedAddresses = approvedAddressesResponse.reduce((acc: any, cur: any) => {
      // response format is [addr, hash, upvotes]
      acc[cur[0]] = parseInt(cur[2])
      return acc
    }, {});

    return approvedAddresses;
  }

  /**
   * Use this method to call the getApprovedAddresses method on an deployed instance of the OnchainVerifier Contract and return the number of addresses
   * @param contractAddress The address where the contract is deployed
   * @param network The network where the contract is deployed
   * @returns The number of approved addresses
   */
  public async getApprovedAddressesCount({
    mergedArguments
    // contractAddress,
    // network,
  }: ContractConfig): Promise<number> {
    const approvedAddresses = await this.getApprovedAddresses({ mergedArguments });
    return Object.keys(approvedAddresses).length;
  }
}

const abi = [
  {
    "inputs": [],
    "name": "getApprovedAddresses",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "hash",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "upvotes",
            "type": "uint256"
          }
        ],
        "internalType": "struct OnchainVerifier.addressDataTuple[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
]
