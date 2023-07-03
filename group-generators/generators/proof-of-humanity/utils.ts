import readline from "readline";
import { ethers } from "ethers";
import { JsonRpcProvider } from "@group-generators/helpers/data-providers/json-rpc";
import { FetchedData } from "topics/group";

// This file is a helper to test the PoH generator
// These functions are not used in the generator itself but are useful to check if the accounts fetched are effectively registered 

/**
 * Verify onchain if an address is registered on PoH
 * @param address group
 * @returns a boolean indicating if the address is registered
 */
const isRegistred = async (address: string): Promise<FetchedData> => {
  const pohContractAddress = "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb"
  const jsonRPCProvider = new JsonRpcProvider(process.env.JSON_RPC_URL);
  const getRegistrationABI =["function isRegistered(address _submissionID) external view returns (bool)"];
  const pohContract = new ethers.Contract(pohContractAddress, getRegistrationABI, jsonRPCProvider);
  const isRegistered = pohContract.isRegistered(address)
  return isRegistered
};

/**
 * Verify onchain if a group of addresses are registered on PoH 
 * @param addresses group
 * @param max the number of addresses to be tested
 * @returns ratio of registered addresses
 */
export const areRegistred = async (addresses: FetchedData, max: number): Promise<number> => {
  let count = 0;
  let realCount = 0;
  let resolved;
  const notRegistredAddress = [];
  for (let i = 0; i < max; i++) {
    resolved = await isRegistred(Object.keys(addresses)[i]);
    realCount++;
    if (resolved) {
      count++;
    }
    else {
      notRegistredAddress.push(Object.keys(addresses)[i])
    }
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`testing ... (${count}/${realCount})`);
  }
  // display the percentage of registered addresses
  console.log(`Percentage of registered addresses: ${(count/max)*100}%`)
  console.log(`Not registred addresses: ${notRegistredAddress}`)
  return count/max;
}

/**
 * Verify onchain if a group of addresses are registered on PoH
 * @param addresses group
 * @param max the number of randomly selected addresses to be tested
 * @returns ratio of registered addresses
 */
export const areRegistredWithRandomness = async (addresses: FetchedData, max: number): Promise<number> => {
  let count = 0;
  let realCount = 0;
  let resolved;
  let index;
  const notRegistredAddress = [];
  for (let i = 0; i < max; i++) {
    index = Math.floor(Math.random()*Object.keys(addresses).length);
    resolved = await isRegistred(Object.keys(addresses)[index]);
    realCount++;
    if (resolved) {
      count++;
    }
    else {
      notRegistredAddress.push(Object.keys(addresses)[index])
    }
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`testing ... (${count}/${realCount})`);
  }
  // display the percentage of registered addresses
  console.log(`Percentage of registered addresses: ${(count/max)*100}%`)
  console.log(`Not registred addresses: ${notRegistredAddress}`)
  return count/max;
}
