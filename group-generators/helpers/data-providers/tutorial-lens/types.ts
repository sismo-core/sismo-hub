export type PageInfo = {
  prev: string;
  next: string;
  totalCount: number;
};

export type Wallet = {
  address: string;
};

export type GetWhoCollectedPublicationType = {
  whoCollectedPublication: {
    items: Wallet[];
    pageInfo: PageInfo;
  };
};

// this type will be used in the index.ts file following the tutorial
export type PublicationId = {
  publicationId: string;
};

export type GetPublicationStatsType = {
  publication: {
    stats: {
      totalAmountOfCollects: number;
    };
  };
};