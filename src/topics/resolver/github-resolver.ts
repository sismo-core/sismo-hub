/* istanbul ignore file */
import axios from "axios";
import { IResolver } from "./resolver";
import {
  handleResolvingErrors,
  resolveAccount,
  withConcurrency,
} from "./utils";
import { FetchedData } from "topics/group";

export class GithubResolver implements IResolver {
  url: string;
  headers: {
    Accept: string;
    Authorization?: string;
  };
  private _githubAuthToken: string | undefined;

  resolvedAccounts: FetchedData = {};

  constructor(githubAuthToken = process.env.SH_GITHUB_TOKEN) {
    this.url = "https://api.github.com/";
    this._githubAuthToken = githubAuthToken;
    this.headers = {
      Accept: "application/vnd.github+json",
      ...(this._githubAuthToken
        ? { Authorization: `Bearer ${this._githubAuthToken}` }
        : {}),
    };
  }

  resolve = async (githubData: FetchedData): Promise<FetchedData> => {
    let githubDataUpdated = Object.entries(githubData).filter(
      ([account, value]) => {
        const splitGithubData = account.split(":");
        if (splitGithubData.length === 3) {
          const id = account.split(":")[2];
          this.resolvedAccounts[resolveAccount("1001", id)] = value;
        }
        return splitGithubData.length !== 3;
      }
    );

    githubDataUpdated = githubDataUpdated.map((data) => {
      return [data[0].split(":")[1], data[1]];
    });

    const githubAccounts = githubDataUpdated.map((item) => item[0]);

    const resolveGithubHandles = async (username: string[]): Promise<void> => {
      const res = await this.resolveGithubHandlesQuery(username[0]);
      if (res !== undefined) {
        const account = githubDataUpdated.find(
          ([account]) => account === username[0]
        );
        if (account) {
          const resolvedAccount = resolveAccount("1001", res.data.id);
          this.resolvedAccounts[resolvedAccount] = account[1];
        }
      } else {
        handleResolvingErrors(
          `Error while fetching https://github.com/${username}. Is it an existing github username?`
        );
      }
    };

    await withConcurrency(githubAccounts, resolveGithubHandles, {
      concurrency: 10,
      batchSize: 1,
    });

    return this.resolvedAccounts;
  };

  private resolveGithubHandlesQuery = async (
    username: string
  ): Promise<any> => {
    const res = await axios({
      url: `${this.url}users/${username}`,
      method: "GET",
      headers: this.headers,
    }).catch((error) => {
      if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message as string;
        if (errorMessage.includes("API rate limit")) {
          throw new Error(
            "Github API rate limit, please add your own Authenticated Github token (see here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)\n"
          );
        }
      } else {
        throw new Error(error);
      }
      return undefined;
    });
    return res;
  };
}
