export type UsersType = {
  users: User[];
};

interface User {
  address: string;
  gains?: Gains;
}

export type ServicesType = {
  services: Service[];
};

interface Service {
  id: string;
  seller: User;
}

interface Gains {
  totalGain: number;
  token: Token;
}

interface Token {
  symbol: string;
}
