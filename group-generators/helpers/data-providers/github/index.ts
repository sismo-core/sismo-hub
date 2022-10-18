import axios from "axios";
import {
  getRepositoryContributorsOptions,
  GithubRepositories,
  GithubUser,
  GithubUserAPI,
} from "./github.types";

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

  public async getRepositoryCommiters(
    owner: string,
    repository: string
  ): Promise<GithubUser[]> {
    const repositoryCommiters = this.fetchGithubUsersWithUrl(
      `${this.url}repos/${owner}/${repository}/contributors?per_page=100&anon=true`
    );
    const allRepositoryCommiters: GithubUser[] = [];
    for await (const repositoryCommiter of repositoryCommiters) {
      allRepositoryCommiters.push(repositoryCommiter);
    }
    return allRepositoryCommiters;
  }

  public async getOrganizationMembers(owner: string): Promise<GithubUser[]> {
    const organizationMembers = this.fetchGithubUsersWithUrl(
      `${this.url}orgs/${owner}/members?per_page=100`
    );
    const allOrganizationMembers: GithubUser[] = [];
    for await (const organizationMember of organizationMembers) {
      allOrganizationMembers.push(organizationMember);
    }
    return allOrganizationMembers;
  }

  public async getRepositoryContributors(
    repositories: GithubRepositories,
    { getOrganizationMembers = true }: getRepositoryContributorsOptions
  ): Promise<GithubUser[]> {
    const allRepositories: GithubUser[][] = [];
    for (const repo of Object.entries(repositories)) {
      allRepositories.push(await this.getRepositoryCommiters(repo[0], repo[1]));
      getOrganizationMembers &&
        allRepositories.push(await this.getOrganizationMembers(repo[0]));
    }

    const totalContributors = [];
    for (const repo of allRepositories) {
      for (const contributor of repo) {
        totalContributors.push(contributor);
      }
    }
    return totalContributors;
  }

  public async *fetchGithubUsersWithUrl(
    url: string
  ): AsyncGenerator<GithubUser, void, undefined> {
    let pageCounter = 0;
    let users: GithubUser[] = [];
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

      users = res.data.map((user: GithubUserAPI) => {
        return {
          id: user.id,
          login: "github:" + user.login,
        };
      });
      for (const user of users) {
        if (user.login !== "github:undefined") {
          yield user;
        }
      }
      pageCounter++;
    } while (users.length === 100);
  }
}
