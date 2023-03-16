export type Users = {
    data: {
        users: User[];
    };
};

interface User {
    address: string;
}
