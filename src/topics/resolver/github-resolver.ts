/* istanbul ignore file */
import axios from "axios";
import { IResolver } from "./resolver";
import { resolveAccount, withConcurrency } from "./utils";
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
    // const githubData = Object.keys(githubDataArray)[0];
    // const githubDataUpdated = githubData.split(":");
    // if (githubDataUpdated.length === 3) {
    //   const id = githubData.split(":")[2];
    //   const resolvedAccount = resolveAccount("1001", id);
    //   return { [resolvedAccount]: Object.values(githubDataArray)[0] };
    // }

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

    console.log("githubDataUpdated1", githubDataUpdated);

    // remove 'twitter:' from the accounts
    githubDataUpdated = githubDataUpdated.map((data) => {
      return [data[0].split(":")[1], data[1]];
    });

    const githubAccounts = githubDataUpdated.map((item) => item[0]);

    console.log("githubAccounts", githubAccounts);

    const resolveGithubHandles = async (username: string[]): Promise<void> => {
      const res = await this.resolveGithubHandlesQuery(username[0]);
      if (res !== undefined) {
        const account = githubDataUpdated.find(
          ([account]) => account === username[0]
        );
        if (account) {
          const resolvedAccount = resolveAccount("1001", res.data.id);
          this.resolvedAccounts[resolvedAccount] = account[1];
          console.log(`Resolved ${username} to ${resolvedAccount}:`);
        }
      }
    };

    await withConcurrency(githubAccounts, resolveGithubHandles, {
      concurrency: 10,
      batchSize: 1,
    });

    // without using withConcurrency

    // for (const [username, value] of githubDataUpdated) {
    //   console.log(username)
    //   const res = await this.resolveGithubHandlesQuery(username);
    //   if (res !== undefined) {
    //     const resolvedAccount = resolveAccount("1001", res.data.id);
    //     this.resolvedAccounts[resolvedAccount] = value;
    //     console.log(`Resolved ${username} to ${resolvedAccount}:`);
    //   }
    // }

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
      const errorMessage = error.response.data.message as string;
      if (errorMessage.includes("API rate limit")) {
        throw new Error(
          "Github API rate limit, please add your own Authenticated Github token (see here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)\n"
        );
      }
      console.log(
        `Error while fetching https://github.com/${username}. Is it an existing github username?`
      );
      return undefined;
    });
    return res;
  };
}
