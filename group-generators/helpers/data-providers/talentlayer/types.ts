export type Users = {
  users: User[];
};

interface User {
  address: string;
  gains?: Gains;
}

export type Service = {
  id: string;
  seller: User;
};

interface Gains {
  totalGain: number;
  token: Token;
}

interface Token {
  symbol: string;
}
