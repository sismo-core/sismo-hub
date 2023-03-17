// discourse api

export type TokenHolder = {
  TokenHolderAddress: string;
  TokenHolderQuantity: string;
};

export type EtherscanResponse = {
  status: string;
  message: string;
  result: TokenHolder[];
};

export type UsersWithBadgesCountRequest = {
  discourseDomain: string;
  apiKey: string;
  badgeId: number;
};

export type UsersCountRequest = {
  discourseDomain: string;
  apiKey: string;
};
