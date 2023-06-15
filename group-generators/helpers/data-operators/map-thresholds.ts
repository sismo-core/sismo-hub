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
    case Operator.LTE:
      thresholds.values.sort((a, b) => a.old - b.old);
      applyThreshold(groupData, joinedAddresses, thresholds.values, (value, threshold) => value.lte(threshold));
      break;
    case Operator.GTE:
      thresholds.values.sort((a, b) => b.old - a.old);
      applyThreshold(groupData, joinedAddresses, thresholds.values, (value, threshold) => value.gte(threshold));
      break;
    case Operator.EQ:
      applyThreshold(groupData, joinedAddresses, thresholds.values, (value, threshold) => value.eq(threshold));
      break;
    default:
      throw new Error('Invalid operator provided');
  }

  return joinedAddresses;
};

const applyThreshold = (
  groupData: FetchedData,
  joinedAddresses: FetchedData,
  values: Array<{ old: number, new: number }>,
  comparator: (bigValue: BigNumber, bigThreshold: BigNumber) => boolean
) => {
  for (const [address, value] of Object.entries(groupData)) {
    const bigValue = BigNumber.from(value);
    
    for (const { old, new: newValue } of values) {
      const bigThreshold = BigNumber.from(old);
      
      if (comparator(bigValue, bigThreshold)) {
        joinedAddresses[address] = newValue;
        break;
      }
    }
  }
};