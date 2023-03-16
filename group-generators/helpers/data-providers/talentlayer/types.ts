export type Users = {
  users: User[];
};

interface User {
  address: string;
}

export type Service = {
  id: string;
  seller: User;
};
