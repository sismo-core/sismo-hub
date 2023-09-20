import { BigNumberish } from "ethers";
import { Contact } from "topics/badge";

export type Properties = {
  accountsNumber: number;
  valueDistribution: { [tier: number]: number };
  minValue: string;
  maxValue: string;
};

export type GroupMetadata = {
  name: string;
  displayName?: string;
  timestamp: number;
  description: string;
  specs: string;
  generatedBy?: string;
  valueType: ValueType;
  accountSources?: string[];
  tags: Tags[];
  publicContacts?: Contact[];
};

export type GroupWithData = GroupMetadata & {
  data: FetchedData;
};

export type ResolvedGroupWithData = GroupMetadata & {
  data: FetchedData;
  resolvedIdentifierData: FetchedData;
};

export type Group = GroupMetadata & {
  id: string;
  data: () => Promise<FetchedData>;
  resolvedIdentifierData: () => Promise<FetchedData>;
};

export enum Tags {
  NFT = "NFT",
  Mainnet = "Mainnet",
  Asset = "Asset",
  Builders = "Builders",
  Community = "Community",
  User = "User",
  Vote = "Vote",
  POAP = "POAP",
  ENS = "ENS",
  Lens = "Lens",
  Web3Social = "Web3Social",
  SybilResistance = "SybilResistance",
  Eth2 = "Eth2",
  GitcoinGrant = "GitcoinGrant",
  GameJutsu = "GameJutsu",
  Factory = "Factory",
  BadgeHolders = "BadgeHolders",
  CoreTeam = "CoreTeam",
  Privacy = "Privacy",
  Maintained = "Maintained",
}

export enum AccountSource {
  ETHEREUM = "ethereum",
  GITHUB = "github",
  TELEGRAM = "telegram",
  TWITTER = "twitter",
  TEST = "test",
  SISMO_CONNECT_APP = "sismo-connect-app",
  DEV = "dev",
}

export enum AccountType {
  ETHEREUM = "ethereum",
  GITHUB = "github",
  TELEGRAM = "telegram",
  TWITTER = "twitter",
  TEST = "test",
  DEV = "dev",
  ENS = "ens",
  LENS = "lens",
  SISMO_CONNECT_APP = "sismo-connect-app",
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
  groupName?: string;
  groupId?: string;
  latest?: boolean;
  timestamp?: number;
};
