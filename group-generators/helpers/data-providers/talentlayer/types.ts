export type Users = {
  data: {
    data: {
      users: User[];
    };
  };
};

interface User {
  address: string;
}
