export type Users = {
  users: User[];
};

export type Services = {
  services: Service[];
};

interface User {
  address: string;
}

export type Service = {
  id: string;
  seller: User;
};
