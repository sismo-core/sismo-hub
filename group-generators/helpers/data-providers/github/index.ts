import axios from "axios";
import { BigNumber } from "ethers";
import { getRepositoryContributorsOptions, GithubRepositories, GithubUser } from "./github.types";
import { FetchedData } from "topics/group";

export class GithubProvider {
  url: string;
  headers: {
    Accept: string;
    Authorization?: string;
  };
  private _githubAuthToken: string | undefined;

  constructor(githubAuthToken = process.env.SH_GITHUB_TOKEN) {
    this.url = "https://api.github.com/";
    this._githubAuthToken = githubAuthToken;
    this.headers = {
      Accept: "application/vnd.github+json",
      ...(this._githubAuthToken ? { Authorization: `Bearer ${this._githubAuthToken}` } : {}),
    };
  }

  /**
   * Use this method to fetch all contributors of one or more GitHub repositories.
   * @param repositories The array of repositories to fetch.
   * @param getOrganizationMembers If true it will fetch the members of the repositories organizations too.
   * @returns The object that contains all GitHub users who contributed to the repositories.
   */
  public async getRepositoriesContributors(
    repositories: GithubRepositories,
    { getOrganizationMembers }: getRepositoryContributorsOptions = {
      getOrganizationMembers: true,
    }
  ): Promise<FetchedData> {
    const allRepositories: GithubUser[][] = [];
    for (const repo of repositories.repositories) {
      const organization = repo.split("/")[0];
      console.log(`Fetching ${organization}...`);
      allRepositories.push(await this._getRepositoryCommiters(repo));
      try {
        getOrganizationMembers &&
          allRepositories.push(await this._getOrganizationMembers(organization));
      } catch {
        console.log(`No organization found for ${organization}`);
      }
    }

    let account;
    let contribution;
    const totalContributors: FetchedData = {};
    for (const repo of allRepositories) {
      for (const contributor of repo) {
        contribution = contributor.contributions ? contributor.contributions : 0;
        account = "github:" + contributor.login + ":" + contributor.id;
        totalContributors[account] = totalContributors[account]
          ? BigNumber.from(totalContributors[account]).add(contribution).toNumber()
          : contribution;
      }
    }
    return totalContributors;
  }

  public async getRepositoriesContributorsCount(
    repositories: GithubRepositories,
    { getOrganizationMembers }: getRepositoryContributorsOptions = {
      getOrganizationMembers: true,
    }
  ): Promise<number> {
    const contributors = await this.getRepositoriesContributors(repositories, {
      getOrganizationMembers,
    });
    return Object.keys(contributors).length;
  }

  /**
   * Use this method to fetch all the GitHub users who put a star on one or more GitHub repositories.
   * @param repositories The array of repositories to fetch.
   * @param defaultValue Define the value of all the items (GitHub users) of the object returned.
   * @returns The object that contains all GitHub users who put a star on the repositories.
   */
  public async getRepositoriesStargazers(
    repositories: GithubRepositories,
    defaultValue = 1
  ): Promise<FetchedData> {
    const allRepositories: GithubUser[][] = [];
    for (const repo of repositories.repositories) {
      const organization = repo.split("/")[0];
      console.log(`Fetching ${organization}...`);
      allRepositories.push(await this._getRepositoryStargazers(repo));
    }

    let account;
    const totalStargazers: FetchedData = {};
    for (const repo of allRepositories) {
      for (const stargazer of repo) {
        account = "github:" + stargazer.login + ":" + stargazer.id;
        totalStargazers[account] = defaultValue;
      }
    }
    return totalStargazers;
  }

  public async getRepositoriesStargazersCount(repositories: GithubRepositories): Promise<number> {
    const stargazers = await this.getRepositoriesStargazers(repositories);
    return Object.keys(stargazers).length;
  }

  private async _getRepositoryCommiters(githubRepo: string): Promise<GithubUser[]> {
    const repositoryCommiters = this._fetchGithubUsersWithUrl(
      `${this.url}repos/${githubRepo}/contributors?per_page=100&anon=true`
    );
    const allRepositoryCommiters: GithubUser[] = [];
    for await (const repositoryCommiter of repositoryCommiters) {
      allRepositoryCommiters.push(repositoryCommiter);
    }
    return allRepositoryCommiters;
  }

  private async _getOrganizationMembers(owner: string): Promise<GithubUser[]> {
    const organizationMembers = this._fetchGithubUsersWithUrl(
      `${this.url}orgs/${owner}/members?per_page=100`
    );
    const allOrganizationMembers: GithubUser[] = [];
    for await (const organizationMember of organizationMembers) {
      allOrganizationMembers.push(organizationMember);
    }
    return allOrganizationMembers;
  }

  private async _getRepositoryStargazers(githubRepo: string): Promise<GithubUser[]> {
    const repositoryStargazers = this._fetchGithubUsersWithUrl(
      `${this.url}repos/${githubRepo}/stargazers?per_page=100&anon=true`
    );
    const allRepositoryStargazers: GithubUser[] = [];
    for await (const repositoryStargazer of repositoryStargazers) {
      allRepositoryStargazers.push(repositoryStargazer);
    }
    return allRepositoryStargazers;
  }

  private async *_fetchGithubUsersWithUrl(
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
        const errorMessage = error.response.data.message as string;
        if (errorMessage.includes("API rate limit")) {
          throw new Error(
            "Github API rate limit, please add your own Authenticated Github token (see here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)\n"
          );
        }
        throw new Error(`Error while fetching ${url}`);
      });

      users = res.data as GithubUser[];
      for (const user of users) {
        if (user.id && user.login && user.login !== "dependabot[bot]") {
          yield user;
        }
      }
      pageCounter++;
    } while (users.length === 100);
  }
}
