import { FetchedData } from "../../../src/group";

export const Join = (...groupsData: FetchedData[]): FetchedData => {
  const joinedAddresses: FetchedData = {};

  for (const groupData of groupsData) {
    for (const address in groupData) {
      joinedAddresses[address] = groupData[address];
    }
  }

  return joinedAddresses;
};
