import { BigNumberish } from "ethers";
import { FetchedData } from "topics/group";

export const Selection = (
  groupData: FetchedData,
  value: BigNumberish
): FetchedData => {
  const accounts: FetchedData = {};
  
  Object.entries(groupData).forEach(([acc, val]) => {
    if(val === value) {
      accounts[acc] = value;
    }
  });

  return accounts;
};
