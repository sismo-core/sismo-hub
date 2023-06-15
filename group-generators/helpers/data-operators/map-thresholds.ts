import { BigNumber } from "ethers";
import { FetchedData } from "topics/group";

export enum Operator {
  LTE = 'LTE',
  GTE = 'GTE',
  EQ = 'EQ',
}

export type Thresholds = {
  operator: Operator;
  values: Array<{
    old: number;
    new: number;
  }>;
};

export const MapThresholds = (
  groupData: FetchedData,
  thresholds: Thresholds
): FetchedData => {
  const joinedAddresses: FetchedData = {};

  switch (thresholds.operator) {
    case "LTE":
      thresholds.values.sort((a, b) => a.old - b.old);
      for (const [address, value] of Object.entries(groupData)) {
        const bigValue = BigNumber.from(value);
      
        for (const value of thresholds.values) {
          const bigMinValue = BigNumber.from(value.old);
          if (bigValue.lte(bigMinValue)) {
            joinedAddresses[address] = value.new;
            break;
          }
        }
      }
      break;
    case "GTE":
      thresholds.values.sort((a, b) => b.old - a.old);
      for (const [address, value] of Object.entries(groupData)) {
        const bigValue = BigNumber.from(value);
        for (const value of thresholds.values) {
          if (bigValue.gte(BigNumber.from(value.old))) {
            joinedAddresses[address] = value.new;
            break;
          }
        }
      }
      break;
    case "EQ":
      for (const [address, value] of Object.entries(groupData)) {
        const bigValue = BigNumber.from(value);
        for (const value of thresholds.values) {
          const bigMinValue = BigNumber.from(value.old);
          if (bigValue.eq(bigMinValue)) {
            joinedAddresses[address] = value.new;
            break;
          }
        }
      }
      break;
    default:
      thresholds.values.sort((a, b) => b.old - a.old);
      break;
  }

  return joinedAddresses;
};