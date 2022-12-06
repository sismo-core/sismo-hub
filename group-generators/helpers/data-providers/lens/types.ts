export type PageInfo = {
  prev: string;
  next: string;
  totalCount: number;
};

export type Wallet = {
  address: string;
};

export type ProfileId = {
  profileId: string;
}

export type PublicationId = {
  publicationId: string;
}

export type FollowerType = {
  wallet: Wallet;
};

export type GetFollowersType = {
  followers: {
    items: FollowerType[];
    pageInfo: PageInfo;
  };
};

export type ProfileType = {
  id: string;
  handle: string;
  ownedBy: string;
};

export type ExploreProfileType = {
  exploreProfiles: {
    items: ProfileType[];
    pageInfo: {
      prev: string;
      next: string;
      totalCount: number;
    };
  };
};

export type GetWhoCollectedPublicationType = {
  whoCollectedPublication: {
    items: Wallet[];
    pageInfo: PageInfo;
  };
};

export type GetWhoMirroredPublicationType = {
  profiles: {
    items: ProfileType[];
    pageInfo: PageInfo;
  };
};
