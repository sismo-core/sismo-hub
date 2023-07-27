export type RoleApiResponse = {
  id: number;
  name: string;
  description: string;
  guildId: number;
  members: string[];
};

export type GuildApiResponse = {
  id: number;
  name: string;
  roles: [
    {
      id: number;
      name: string;
    }
  ];
};

export type GuildName = {
  name: string;
};

export type RoleRequest = {
  id: number;
  roleValue?: boolean;
};
