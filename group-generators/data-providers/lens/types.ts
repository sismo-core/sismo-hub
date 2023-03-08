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
};

export type PublicationId = {
  publicationId: string;
};

export type FollowerType = {
  wallet: Wallet;
};

export type GetFollowersType = {
  followers: {
    items: FollowerType[];
    pageInfo: PageInfo;
  };
};

export type GetFollowersCountType = {
  profile: {
    stats: {
      totalFollowers: number;
    };
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

export type GetPublicationStatsType = {
  publication: {
    stats: {
      totalAmountOfCollects: number;
      totalAmountOfMirrors: number;
      totalAmountOfComments: number;
    };
  };
};

export type GetWhoMirroredPublicationType = {
  profiles: {
    items: ProfileType[];
    pageInfo: PageInfo;
  };
};
