export type UsersType = {
  users: User[];
};

export type ServicesType = {
  services: Service[];
};

export type Reviews = {
  reviews: Review[];
};

interface User {
  address: string;
  gains?: Gains;
}

interface Service {
  id: string;
  seller: User;
}

interface Review {
  to: User;
}

interface Gains {
  totalGain: number;
  token: Token;
}

interface Token {
  symbol: string;
}
