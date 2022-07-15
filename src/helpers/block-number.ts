import { ethers } from "ethers";

export const getCurrentBlockNumber = async (): Promise<number> => {
  /* istanbul ignore next */
  return ethers.getDefaultProvider().getBlockNumber();
};
