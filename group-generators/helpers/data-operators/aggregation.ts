import { BigNumber } from "ethers";
import { FetchedData } from "topics/group";

export const Aggregation = (groupsData: FetchedData[]): FetchedData => {
  const aggregatedAddresses: FetchedData = {};
  for (const groupData of groupsData) {
    for (const address in groupData) {
      if (address in aggregatedAddresses) {
        // add value of address in groupData if address exists in aggregatedAddresses
        aggregatedAddresses[address] = BigNumber.from(aggregatedAddresses[address]).add(groupData[address])
      } else {
        aggregatedAddresses[address] = groupData[address];
      }
    }
  }

  return aggregatedAddresses;
};
