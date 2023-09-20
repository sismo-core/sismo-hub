export type Score = { score: number };

export type BeaconResponse = {
  beacons: Beacon[];
  meta: {
    nextCursor: string;
  };
};

export type Beacon = {
  address: string;
  primaryTraits: {
    degen_score: string;
  };
  updatedAt: string;
};
