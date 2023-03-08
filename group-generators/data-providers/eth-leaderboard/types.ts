export type User = {
  id: string;
  name: string;
  ens: string;
  handle: string;
  followers: number;
  verified: boolean;
  updated: string;
  pfp: string;
  ranking: number;
};

export type UserData = {
  ens: string;
  handle: string;
};
