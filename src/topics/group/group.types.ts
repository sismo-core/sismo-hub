import { BigNumberish } from "ethers";

export type GroupMetadata = {
  name: string;
  timestamp: number;
  valueType: ValueType;
  tags: Tags[];
};

export type GroupWithData = GroupMetadata & {
  data: FetchedData;
};

export type Group = GroupMetadata & {
  data: () => Promise<FetchedData>;
};

export enum Tags {
  NFT = "NFT",
  Mainnet = "Mainnet",
  Asset = "Asset",
  User = "User",
  Vote = "Vote",
  POAP = "POAP",
  ENS = "ENS",
  Lens = "Lens",
  Web3Social = "Web3Social",
  SybilResistance = "SybilResistance",
  Eth2 = "Eth2",
  GameJutsu = "GameJutsu"
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

export type GroupSearch = {
  groupName: string;
  latest?: boolean;
};
