import axios from "axios";
import {
  DiscourseUser,
  DiscourseBadge,
  DiscourseGroup,
  DiscourseGroupMember,
  UsersWithBadgesCountRequest,
  UsersCountRequest,
} from "./types";
import { FetchedData } from "topics/group";

export class DiscourseProvider {
  url: string;
  headers: {
    authorization: string;
    accept: string;
  };

  public async getDiscourse(endpoint: string): Promise<any> {
    const { data: res } = await axios({
      url: this.url + "/" + endpoint,
      method: "get",
      headers: this.headers,
    });
    return res;
  }

  public async getAllUsers(): Promise<DiscourseUser[]> {
    try {
      const res = await this.getDiscourse("admin/users/list/active.json");
      const users: DiscourseUser[] = res.result.members;
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

  public async getAllBadges(): Promise<DiscourseBadge[]> {
    try {
      const res = await this.getDiscourse("admin/badges.json");
      const badges: DiscourseBadge[] = res.result.badges;
      return badges;
    } catch (error) {
      throw new Error("Error fetching the badges: " + error);
    }
  }

  public async getGroups(): Promise<DiscourseGroup[]> {
    try {
      const res = await this.getDiscourse("admin/users/list/active.json");
      const groups: DiscourseGroup[] = res.result;
      return groups;
    } catch (error) {
      throw new Error("Error fetching the groups: " + error);
    }
  }

  public async getMembersGroup(id: number): Promise<DiscourseGroupMember[]> {
    try {
      const res = await this.getDiscourse(`/groups/${id}/members.json`);
      const members: DiscourseGroupMember[] = res.result;
      return members;
    } catch (error) {
      throw new Error("Error fetching the groups: " + error);
    }
  }

  async getBadgesForUser(userName: string): Promise<DiscourseBadge[]> {
    try {
      const res = await this.getDiscourse(`user-badges/${userName}.json`);
      const badges: DiscourseBadge[] = res.result.badges;
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
