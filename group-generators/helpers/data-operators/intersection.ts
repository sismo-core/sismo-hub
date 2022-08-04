import { FetchedData } from "topics/group";

export type IntersectionOptionsType = {
  intersectionValue: number;
};

export const defaultIntersectionOptions: IntersectionOptionsType = {
  intersectionValue: 1,
};

export const Intersection = (
  groupData1: FetchedData,
  groupData2: FetchedData,
  options: IntersectionOptionsType = defaultIntersectionOptions
): FetchedData => {
  const intersectedAddresses: FetchedData = {};

  const group1 = new Set(
    Object.keys(groupData1).map((addr) => addr.toLowerCase())
  );
  const group2 = new Set(
    Object.keys(groupData2).map((addr) => addr.toLowerCase())
  );

  const intersection = new Set([...group1].filter((x) => group2.has(x)));

  for (const address of intersection) {
    intersectedAddresses[address] = options.intersectionValue;
  }

  return intersectedAddresses;
};
