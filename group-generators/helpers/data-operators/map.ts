import { BigNumber, BigNumberish } from "ethers";
import { FetchedData } from "topics/group";

export type Thresholds = {
  min: number;
  newValue: number;
}[]

export const Map = (
  groupData: FetchedData,
  value?: BigNumberish,
  thresholds?: Thresholds
): FetchedData => {
  const joinedAddresses: FetchedData = {};

  if (value === undefined && thresholds === undefined) {
    throw new Error("Map operator requires either a value or a thresholds array");
  }

  if(value !== undefined) {
    for (const address in groupData) {
      joinedAddresses[address] = value;
    }
  }

  if(thresholds !== undefined) {
    // Sort thresholds in descending order
    thresholds.sort((a, b) => b.min - a.min);
    
    for (const [address, value] of Object.entries(groupData)) {
      const bigValue = BigNumber.from(value);
    
      for (const threshold of thresholds) {
        const bigMinValue = BigNumber.from(threshold.min);
        if (bigValue.gte(bigMinValue)) {
          joinedAddresses[address] = threshold.newValue;
          break;
        }
      }
    }
  }

  return joinedAddresses;
};