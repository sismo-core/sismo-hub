import { ethers } from "ethers";
import { toUtf8Bytes } from "ethers/lib/utils";

export const computeSolidityFunctionSignature = (functionName: string): string => {
  return ethers.utils.keccak256(toUtf8Bytes(functionName)).slice(0, 10);
};

export const abiEncode = (types: string[], values: any[]): string => {
  return ethers.utils.defaultAbiCoder.encode(types, values);
};
