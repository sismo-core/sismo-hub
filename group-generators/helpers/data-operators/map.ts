import { BigNumberish } from "ethers";
import { FetchedData } from "../../../src/group";

export const Map = (
  groupData: FetchedData,
  value: BigNumberish
): FetchedData => {
  const joinedAddresses: FetchedData = {};

  for (const address in groupData) {
    joinedAddresses[address] = value;
  }

  return joinedAddresses;
};
