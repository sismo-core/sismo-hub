import { BigNumberish } from "ethers";

export type ListConstructor = {
  generationDate: Date;
  data: FetchedData;
  valueType: ValueType;
  tags: Tags[];
  generatorId?: number;
};

export enum Tags {
  NFT = "NFT",
  Mainnet = "Mainnet",
  Asset = "Asset",
  User = "User",
  Vote = "Vote",
  POAP = "POAP",
  ENS = "ENS",
}

export enum ValueType {
  // Score means the user can choose a lower score that the one in the data
  // this is designed to avoid doxing
  Score = "Score",
  // Info means the user need to select the exact data
  Info = "Info",
}

export type FetchedData = {
  [address: string]: BigNumberish;
};
