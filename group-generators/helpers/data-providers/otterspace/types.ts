export type SubgraphRespnse = {
  badgeSpec: {
    id: string;
    badges: [
      {
        id: string;
        owner: string;
      }
    ];
  };
};

export type BadgeId = {
  id: string;
};
