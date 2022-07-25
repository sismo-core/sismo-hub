import { ethers } from "ethers";

export const getCurrentBlockNumber = async (): Promise<number> => {
  return ethers.getDefaultProvider().getBlockNumber();
};
