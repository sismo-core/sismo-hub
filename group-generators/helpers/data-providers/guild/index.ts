import axios from "axios";
import { GuildApiResponse, GuildName, RoleApiResponse, RoleId } from "./types";
import { FetchedData } from "topics/group";

export class GuildProvider {
  url: string;

  public constructor() {
    this.url = "https://api.guild.xyz/v1/";
  }

  public async getGuildMembers({ name }: GuildName): Promise<FetchedData> {
    try {
      // fetch all roles in guild
      const users: FetchedData = {};
      const res: GuildApiResponse = await this.getGuildConnection(
        `guild/${name}`
      );
      const roles = res.roles;

      // fetch members of each role in guild
      roles.forEach(async (role) => {
        const members = await this.getRoleMembers({ id: role.id });
        Object.keys(members).forEach((member) => {
          users[member] = 1;
        });
      });
      return users;
    } catch (error) {
      throw new Error("Error fetching members of guild: " + error);
    }
  }

  public async getGuildMembersCount({ name }: GuildName): Promise<number> {
    const res = await this.getGuildMembers({ name: name });
    return Object.keys(res).length;
  }

  public async getRoleMembers({ id }: RoleId): Promise<FetchedData> {
    try {
      // fetch all members of guild
      const res: RoleApiResponse = await this.getGuildConnection(`guild/${id}`);
      const users: FetchedData = {};
      res.members.forEach((member) => {
        users[member] = 1;
      });
      return users;
    } catch (error) {
      throw new Error("Error fetching members of role: " + error);
    }
  }

  public async getRoleMembersCount({ id }: RoleId): Promise<number> {
    const res = await this.getRoleMembers({ id: id });
    return Object.keys(res).length;
  }

  private async getGuildConnection(endpoint: string): Promise<any> {
    const { data: res } = await axios({
      url: this.url + endpoint,
      method: "get",
    });
    return res;
  }
}
