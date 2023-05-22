/* istanbul ignore file */
import axios from "axios";
import { BigNumberish } from "ethers";
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

  resolve = async (accounts: FetchedData): Promise<FetchedData> => {
    const accountsAlreadyResolved: FetchedData = {};

    let accountsNotResolved = Object.entries(accounts).filter(
      ([account, value]) => {
        const accountsWithoutValues = account.split(":");
        if (accountsWithoutValues.length === 3) {
          const id = account.split(":")[2];
          accountsAlreadyResolved[resolveAccount("1001", id)] = value;
        }
        return accountsWithoutValues.length !== 3;
      }
    );

    // remove 'github:' from the accounts
    accountsNotResolved = accountsNotResolved.map((accountWithType) => {
      return [accountWithType[0].split(":")[1], accountWithType[1]];
    });

    const accountsResolvedArray = await withConcurrency(
      accountsNotResolved,
      this.resolveGithubAccounts,
      {
        concurrency: 10,
        batchSize: 1,
      }
    );

    let accountsResolved = accountsResolvedArray.reduce(
      (accumulator, currentObject) => {
        return { ...accumulator, ...currentObject };
      },
      {}
    );

    accountsResolved = { ...accountsResolved, ...accountsAlreadyResolved };

    return accountsResolved;
  };

  private resolveGithubAccounts = async (
    accountsNotResolved: [string, BigNumberish][]
  ): Promise<FetchedData> => {
    const username = accountsNotResolved.map((item) => item[0]);
    const accountsResolved: FetchedData = {};
    const res = await this.resolveGithubAccountsQuery(username[0]);

    if (res !== undefined) {
      const account = accountsNotResolved.find(
        ([account]) => account === username[0]
      );
      if (account) {
        const resolvedAccount = resolveAccount("1001", res.data.id);
        accountsResolved[resolvedAccount] = account[1];
      }
    } else {
      handleResolvingErrors(
        `Error while fetching https://github.com/${username}. Is it an existing github username?`
      );
    }

    return accountsResolved;
  };

  private resolveGithubAccountsQuery = async (
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
