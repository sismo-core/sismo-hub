import axios from "axios";
// eslint-disable-next-line no-restricted-imports
import { TokenHolder } from "../transpose/types";
import { UsersWithBadgesCountRequest, UsersCountRequest } from "./types";
import { FetchedData } from "topics/group";

export class DegenScoreProvider {
  url: string;
  headers: {
    authorization: string;
    accept: string;
  };

  public async getTokenHolders(): Promise<TokenHolder[]> {
    const { data: res } = await axios({
      url: "https://api.etherscan.io/api?module=token&action=tokenholderlist&contractaddress=0x0521FA0bf785AE9759C7cB3CBE7512EbF20Fbdaa&page=1&offset=10&apikey=process.env.ETHERSCAN_API_KEY",
      method: "get",
    });
    return res.result;
  }

  public async getDiscourse(endpoint: string): Promise<any> {
    const { data: res } = await axios({
      url: this.url + "/" + endpoint,
      method: "get",
      headers: this.headers,
    });
    return res;
  }

  public async getAllUsers(): Promise<any[]> {
    try {
      const res = await this.getDiscourse("admin/users/list/active.json");
      const users: any[] = res.result.members;
      return users;
    } catch (error) {
      throw new Error("Error fetching the users:" + error);
    }
  }

  public async getUsers(): Promise<FetchedData> {
    const res: FetchedData = {};
    try {
      const users = await this.getAllUsers();

      users.forEach((user) => {
        res[user.id] = 1;
      });

      return res;
    } catch (error) {
      throw new Error("Error fetching the users: " + error);
    }
  }

  public async getUsersCount(requestData: UsersCountRequest): Promise<number> {
    this.url = requestData.discourseDomain;
    this.headers = {
      authorization: requestData.apiKey as string,
      accept: "application/json",
    };
    const users = await this.getUsers();
    return Object.keys(users).length;
  }

  public async getAllBadges(): Promise<any[]> {
    try {
      const res = await this.getDiscourse("admin/badges.json");
      const badges: any[] = res.result.badges;
      return badges;
    } catch (error) {
      throw new Error("Error fetching the badges: " + error);
    }
  }

  public async getGroups(): Promise<any[]> {
    try {
      const res = await this.getDiscourse("admin/users/list/active.json");
      const groups: any[] = res.result;
      return groups;
    } catch (error) {
      throw new Error("Error fetching the groups: " + error);
    }
  }

  public async getMembersGroup(id: number): Promise<any[]> {
    try {
      const res = await this.getDiscourse(`/groups/${id}/members.json`);
      const members: any[] = res.result;
      return members;
    } catch (error) {
      throw new Error("Error fetching the groups: " + error);
    }
  }

  async getBadgesForUser(userName: string): Promise<any[]> {
    try {
      const res = await this.getDiscourse(`user-badges/${userName}.json`);
      const badges: any[] = res.result.badges;
      return badges;
    } catch (error) {
      throw new Error(
        "Error fetching badges of users: " + userName + " with error " + error
      );
    }
  }

  public async getUsersWithBadges(
    requestData: UsersWithBadgesCountRequest
  ): Promise<FetchedData> {
    const users: FetchedData = {};

    const listOfUsers = await this.getAllUsers();

    for (const user of listOfUsers) {
      const badgesForUser = await this.getBadgesForUser(user.username);
      badgesForUser.forEach((badges) => {
        if (badges.id == requestData.badgeId) {
          users[user.id] = 1;
        }
      });
    }
    return users;
  }

  public async getUsersWithBadgesCount(
    requestData: UsersWithBadgesCountRequest
  ): Promise<number> {
    this.url = requestData.discourseDomain;
    this.headers = {
      authorization: requestData.apiKey as string,
      accept: "application/json",
    };
    const users = await this.getUsersWithBadges(requestData);
    return Object.keys(users).length;
  }
}
