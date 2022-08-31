export type pageInfo = {
  prev: string;
  next: string;
  totalCount: number;
};

export type Wallet = {
  address: string;
};

export type FollowerType = {
  wallet: Wallet
};

export type GetFollowersType = {
  followers: {
    items: FollowerType[];
    pageInfo: pageInfo;
  };
};

export type ProfileType = {
  handle: string;
  ownedBy: string;
};

export type ExploreProfileType = {
  exploreProfiles: {
    items: ProfileType[];
    pageInfo: pageInfo;
  };
};

export type GetWhoCollectedPublicationType = {
  whoCollectedPublication: {
    items: Wallet[];
    pageInfo: pageInfo;
}
};