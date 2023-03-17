export type Users = {
  users: User[];
};

export type Services = {
  services: Service[];
};

export type ReviewsType = {
  reviews: Review[];
};

interface User {
  address: string;
  totalGains?: Gains[];
}

interface Service {
  id: string;
  seller: User;
}

interface Review {
  to: User;
  service: Service;
}

interface Gains {
  totalGain: number;
  token: Token;
}

interface Token {
  symbol: string;
}
