export type Score = { score: number };

export type BeaconResponse = {
  beacons: [
    {
      address: string;
      primaryTraits: {
        degenScore: string;
      };
      updatedAt: string;
    }
  ];
  meta: {
    nextCursor: string;
  };
};
