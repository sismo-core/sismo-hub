export type TokenHolder = {
  TokenHolderAddress: string;
  TokenHolderQuantity: string;
};

export type EtherscanResponse = {
  status: string;
  message: string;
  result: TokenHolder[];
};

export type DegenScoreTrait = {
  name: string;
  description: string;
  image: string;
  value: string | number;
  valueType: string;
  traitType: string;
  rarity: string;
  id: string;
  tags: { id: string; value: string }[];
};

export type TraitInfoResponse = {
  name: string;
  description: string;
  image: string;
  properties: {
    valueType: string;
  };
};

export type BeaconInfoResponse = {
  name: string;
  description: string;
  image: string;
  properties: any;
  updatedAt: string;
  isConfirmed: boolean;
  external_url: string;
  animation_url: string;
  traits: DegenScoreTrait;
};

export type UserBeaconData = {
  owner_address: string;
  balance: string;
  beaconData: BeaconInfoResponse;
};
