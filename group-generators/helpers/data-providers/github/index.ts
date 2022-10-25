import axios from "axios";
import {
  getRepositoryContributorsOptions,
  GithubRepositories,
  GithubLogin,
  GithubUserAPI,
} from "./github.types";
import { FetchedData } from "topics/group";

export class GithubProvider {
  url: string;
  headers: {
    Accept: string;
    Authorization?: string;
  };
  private _githubAuthToken: string | undefined;

  constructor(githubAuthToken = process.env.GITHUB_TOKEN) {
    this.url = "https://api.github.com/";
    this._githubAuthToken = githubAuthToken;
    this.headers = {
      Accept: "application/vnd.github+json",
      ...(this._githubAuthToken
        ? { Authorization: `Bearer ${this._githubAuthToken}` }
        : {}),
    };
  }

  /**
   * Use this method to fetch all contributors of one or more GitHub repositories.
   * @param repositories The array of repositories to fetch. Array format: ["owner/repository"]. Example: ["ethereum/solidity"].
   * @param getOrganizationMembers If true it will fetch the members of the repositories organizations too. If false it will not. Example : {getOrganizationMembers: true}
   * @param defaultValue Define the value of all the items (GitHub users) of the object returned.
   * @returns The object that contains all GitHub users who contributed to the repositories.
   */
  public async getRepositoriesContributors(
    repositories: GithubRepositories,
    { getOrganizationMembers }: getRepositoryContributorsOptions = {
      getOrganizationMembers: true,
    },
    defaultValue = 1
  ): Promise<FetchedData> {
    const allRepositories: GithubLogin[][] = [];
    for (const repo of repositories) {
      const organization = repo.split("/")[0];
      console.log(`Fetching ${organization}...`);
      allRepositories.push(await this._getRepositoryCommiters(repo));
      getOrganizationMembers &&
        allRepositories.push(await this._getOrganizationMembers(organization));
    }

    const totalContributors: FetchedData = {};
    for (const repo of allRepositories) {
      for (const contributor of repo) {
        totalContributors[contributor] = defaultValue;
      }
    }
    return totalContributors;
  }

  private async _getRepositoryCommiters(
    githubRepo: string
  ): Promise<GithubLogin[]> {
    const repositoryCommiters = this._fetchGithubUsersWithUrl(
      `${this.url}repos/${githubRepo}/contributors?per_page=100&anon=true`
    );
    const allRepositoryCommiters: GithubLogin[] = [];
    for await (const repositoryCommiter of repositoryCommiters) {
      allRepositoryCommiters.push(repositoryCommiter);
    }
    return allRepositoryCommiters;
  }

  private async _getOrganizationMembers(owner: string): Promise<GithubLogin[]> {
    const organizationMembers = this._fetchGithubUsersWithUrl(
      `${this.url}orgs/${owner}/members?per_page=100`
    );
    const allOrganizationMembers: GithubLogin[] = [];
    for await (const organizationMember of organizationMembers) {
      allOrganizationMembers.push(organizationMember);
    }
    return allOrganizationMembers;
  }

  private async *_fetchGithubUsersWithUrl(
    url: string
  ): AsyncGenerator<GithubLogin, void, undefined> {
    let pageCounter = 0;
    let users: GithubLogin[] = [];
    do {
      const res = await axios({
        url: `${url}&page=${pageCounter}`,
        method: "GET",
        headers: this.headers,
      }).catch((error) => {
        console.log(error);
        const errorMessage = error.response.data.message as string;
        if (errorMessage.includes("API rate limit")) {
          throw new Error(
            "Github API rate limit, please add your own Authenticated Github token (see here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)\n"
          );
        }
        throw new Error("Error while fetching");
      });

      users = res.data.map(
        (user: GithubUserAPI) => "github:" + user.login + ":" + user.id
      );
      for (const user of users) {
        if (user.slice(16) !== "github:undefined") {
          yield user;
        }
      }
      pageCounter++;
    } while (users.length === 100);
  }
}
