import readline from "readline";
import { ethers } from "ethers";
import { JsonRpcProvider } from "@group-generators/helpers/data-providers/json-rpc";
import { FetchedData } from "topics/group";

const isRegistred = async (address: string): Promise<FetchedData> => {
  const pohContractAddress = "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb"
  const jsonRPCProvider = new JsonRpcProvider(process.env.JSON_RPC_URL);
  const getRegistrationABI =["function isRegistered(address _submissionID) external view returns (bool)"];
  const pohContract = new ethers.Contract(pohContractAddress, getRegistrationABI, jsonRPCProvider);
  const isRegistered = pohContract.isRegistered(address)
  return isRegistered
};

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
