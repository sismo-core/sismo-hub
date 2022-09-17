import { FetchedData } from "topics/group";

export const Union = (...groupsData: FetchedData[]): FetchedData => {
  const unionAddresses: FetchedData = {};

  for (const groupData of groupsData) {
    for (const address in groupData) {
      unionAddresses[address] = groupData[address];
    }
  }

  return unionAddresses;
};
