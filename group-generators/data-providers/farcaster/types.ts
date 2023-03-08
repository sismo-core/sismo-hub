export type FarcasterUser = {
  fid: number;
  username: string;
  displayName: string;
  pfp: { url: string; verified: boolean };
  profile: {
    bio: {
      text: string;
      mentions: [];
    };
    location: { placeId: string; description: string };
  };
  followerCount: number;
  followingCount: number;
  viewerContext: { following: boolean; followedBy: boolean };
};

export type FarcasterUserVerification = {
  fid: number;
  address: string;
  timestamp: number;
};
