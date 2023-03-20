export type Users = {
  users: User[];
};

export type Services = {
  services: Service[];
};

export type Reviews = {
  reviews: Review[];
};

export type UserGains = {
  userGains: UserGain[];
};

interface User {
  address: string;
}

interface Service {
  id: string;
  seller: User;
  transaction?: Transaction;
}

interface Review {
  to: User;
  service: Service;
}

export interface UserGain {
  totalGain: string;
  token: Token;
  user: User;
}

interface Token {
  symbol: string;
  decimals: number;
}

interface Transaction {
  payments: Payment[];
  token: Token;
}

interface Payment {
  amount: string;
}

export type AddressPayments = {
  [address: string]: number;
};

export type DidSellerServiceBuyer = {
  buyerHandle: string;
  minimalAmountOfServices?: number;
};

export type DidWorkOnTopic = {
  topic: string;
  numberOfTimes?: number;
};

export type DidUserMinimalEarnedOfToken = {
  minimumEarnings?: number;
  tokenSymbol?: string;
};

export type DidWorkWithRating = {
  minRating: number;
  numberOfTimes?: number;
};

export type TalentOfTheMonth = {
  topic: string;
  period?: string;
  tokenSymbol?: string;
  leaderboardSize?: number;
};
