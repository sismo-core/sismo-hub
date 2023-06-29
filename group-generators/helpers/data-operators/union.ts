import { BigNumber } from "ethers";
import { FetchedData } from "topics/group";

export enum UnionOption {
  Max = "max",
  Min = "min",
  Sum = "sum"
}

export const Union = (groupsData: FetchedData[], unionOption=UnionOption.Max): FetchedData => {
  const unionAddresses: FetchedData = {};
  for (const groupData of groupsData) {

    for (const address in groupData) {
      if (address in unionAddresses) {
        if(unionOption === UnionOption.Sum) {
          unionAddresses[address] = BigNumber.from(unionAddresses[address]).add(BigNumber.from(groupData[address])).toString();
        }
        else if (unionAddresses[address] > groupData[address]) {
          if (unionOption === "min") {
            unionAddresses[address] = groupData[address];
          }
        } else {
          if (unionOption === "max") {
            unionAddresses[address] = groupData[address];
          }
        }
      } else {
        unionAddresses[address] = groupData[address];
      }
    }
  }

  return unionAddresses;
};
