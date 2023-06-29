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
      const bigValue = BigNumber.from(groupData[address]);
      if (address in unionAddresses) {
        const bigUnionValue = BigNumber.from(unionAddresses[address]);
        if(unionOption === UnionOption.Sum) {
          unionAddresses[address] = bigUnionValue.add(bigValue).toString();
        }
        else if (bigUnionValue.gt(bigValue)) {
          if (unionOption === "min") {
            unionAddresses[address] = bigValue.toString();
          }
        } else {
          if (unionOption === "max") {
            unionAddresses[address] = bigValue.toString();
          }
        }
      } else {
        unionAddresses[address] = bigValue.toString();
      }
    }
  }

  return unionAddresses;
};
