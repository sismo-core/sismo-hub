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
    contractAddress,
    network,
  }: ContractConfig): Promise<FetchedData> {
    const provider = ethers.getDefaultProvider(network)

    const contract = new ethers.Contract(contractAddress, abi, provider);

    const approvedAddresses = await contract.getApprovedAddresses();
    console.log(approvedAddresses);

    return approvedAddresses;
  }

  /**
   * Use this method to call the getApprovedAddresses method on an deployed instance of the OnchainVerifier Contract and return the number of addresses
   * @param contractAddress The address where the contract is deployed
   * @param network The network where the contract is deployed
   * @returns The number of approved addresses
   */
  public async getApprovedAddressesCount({
    contractAddress,
    network,
  }: ContractConfig): Promise<number> {
    const approvedAddresses = await this.getApprovedAddresses({ contractAddress, network });
    return Object.keys(approvedAddresses).length;
  }
}

const abi = [
	{
		"inputs": [],
		"name": "getApprovedAddresses",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]