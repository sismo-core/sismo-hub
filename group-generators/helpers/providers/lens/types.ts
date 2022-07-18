export type FollowerType = {
  wallet: {
    address: string;
  };
};

export type GetFollowersType = {
  followers: {
    items: FollowerType[];
    pageInfo: {
      prev: string;
      next: string;
      totalCount: number;
    };
  };
};

export type ProfileType = {
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
