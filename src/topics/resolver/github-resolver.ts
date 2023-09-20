/* istanbul ignore file */
import axios from "axios";
import { BigNumberish } from "ethers";
import { IResolver } from "./resolver";
import { handleResolvingErrors, mergeWithMax, resolveAccount, withConcurrency } from "./utils";
import { AccountSource, FetchedData } from "topics/group";

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
      ...(this._githubAuthToken ? { Authorization: `Bearer ${this._githubAuthToken}` } : {}),
    };
  }

  public resolve = async (
    accounts: FetchedData
  ): Promise<{
    accountSources: string[];
    resolvedAccountsRaw: FetchedData;
    resolvedAccounts: FetchedData;
  }> => {
    const alreadyUpdatedAccounts: FetchedData = {};
    const alreadyResolvedAccounts: FetchedData = {};

    // extract github usernames already resolved
    const unresolvedAccounts = Object.entries(accounts).filter(([account, value]) => {
      if (account.split(":").length === 3) {
        const id = account.split(":")[2];
        alreadyResolvedAccounts[resolveAccount("1001", id)] = value;
        alreadyUpdatedAccounts[account] = value;
      }
      return account.split(":").length !== 3;
    });

    const resolvedAccountsArrays = await withConcurrency(
      unresolvedAccounts,
      this.resolveGithubAccounts,
      {
        concurrency: 10,
        batchSize: 1,
      }
    );

    const resolvedAccountsRaw = mergeWithMax(resolvedAccountsArrays[0], alreadyUpdatedAccounts);
    const resolvedAccounts = mergeWithMax(resolvedAccountsArrays[1], alreadyResolvedAccounts);

    return {
      accountSources: [AccountSource.GITHUB],
      resolvedAccountsRaw,
      resolvedAccounts,
    };
  };

  private resolveGithubAccounts = async (
    accounts: [string, BigNumberish][]
  ): Promise<[FetchedData, FetchedData]> => {
    const updatedAccounts: FetchedData = {};
    const resolvedAccounts: FetchedData = {};

    const prefix = accounts[0][0].split(":")[0];

    // remove 'github:' from the accounts
    const accountsWithoutType: [string, BigNumberish][] = accounts.map((accountWithType) => {
      return [accountWithType[0].split(":")[1], accountWithType[1]];
    });

    const username = accountsWithoutType.map((accountWithoutType) => {
      return accountWithoutType[0];
    });
    const res = await this.resolveGithubAccountsQuery(username[0]);

    if (res !== undefined) {
      const account = accountsWithoutType.find(
        ([account]) => account.toLowerCase() === res.data.login.toLowerCase()
      );
      if (account) {
        const resolvedAccount = resolveAccount("1001", res.data.id);
        resolvedAccounts[resolvedAccount] = account[1];
        updatedAccounts[prefix + ":" + account[0]] = account[1];
      }
    } else {
      handleResolvingErrors(
        `Error on this GitHub username: ${username}. Is it an existing github username?`
      );
    }

    return [updatedAccounts, resolvedAccounts];
  };

  private resolveGithubAccountsQuery = async (username: string): Promise<any> => {
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
      } else if (error.response.status && error.response.statusText) {
        handleResolvingErrors(
          `Error while fetching ${username}. Is it an existing github username?` +
            " => Error " +
            error.response.status +
            ": " +
            error.response.statusText
        );
      } else {
        handleResolvingErrors(
          `Error while fetching ${username}. Is it an existing github username?`
        );
      }
      return undefined;
    });
    return res;
  };
}
