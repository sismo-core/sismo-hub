import { BigNumber, BigNumberish } from "ethers";
import { FetchedData } from "topics/group";

export const Filter = (
  groupData: FetchedData,
  value: BigNumberish
): FetchedData => {
  const accounts: FetchedData = {};
  
  Object.entries(groupData).forEach(([acc, val]) => {
    if(BigNumber.from(val).eq(BigNumber.from(value))) {
      accounts[acc] = value;
    }
  });

  return accounts;
};
