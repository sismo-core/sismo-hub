/* istanbul ignore file */
import axios from "axios";
import { BigNumberish } from "ethers";
import { IResolver } from "./resolver";
import { resolveAccount, withConcurrency, handleResolvingErrors, mergeWithMax } from "./utils";
import { AccountSource, FetchedData } from "topics/group";

export class TwitterResolver implements IResolver {
  twitterUrl: string;
  twitterHeaders: { Authorization: string }[] = [];

  constructor(twitterApiKey = process.env.TWITTER_API_KEY) {
    this.twitterUrl = "https://api.twitter.com/";
    const twitterApiKeys = twitterApiKey?.split(",") ?? [];
    twitterApiKeys.map((key) => {
      this.twitterHeaders.push({
        Authorization: `Bearer ${key}`,
      });
    });
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

    // extract twitter usernames already resolved
    const unresolvedAccounts = Object.entries(accounts).filter(([account, value]) => {
      if (account.split(":").length === 3) {
        const id = account.split(":")[2];
        alreadyResolvedAccounts[resolveAccount("1002", id)] = value;
        alreadyUpdatedAccounts[account] = value;
      }
      return account.split(":").length !== 3;
    });

    const resolvedAccountsArrays = await withConcurrency(
      unresolvedAccounts,
      this.resolveTwitterHandles,
      {
        concurrency: 20,
        batchSize: 100,
      }
    );

    const resolvedAccountsRaw = mergeWithMax(resolvedAccountsArrays[0], alreadyUpdatedAccounts);
    const resolvedAccounts = mergeWithMax(resolvedAccountsArrays[1], alreadyResolvedAccounts);

    return {
      accountSources: [AccountSource.TWITTER],
      resolvedAccountsRaw,
      resolvedAccounts,
    };
  };

  private resolveTwitterHandles = async (
    accounts: [string, BigNumberish][]
  ): Promise<[FetchedData, FetchedData]> => {
    const updatedAccounts: FetchedData = {};
    const resolvedAccounts: FetchedData = {};

    const prefix = accounts[0][0].split(":")[0];

    // remove 'twitter:' from the accounts
    const accountsWithoutType: [string, BigNumberish][] = accounts.map((accountWithType) => {
      return [accountWithType[0].split(":")[1], accountWithType[1]];
    });

    // get only the twitter usernames
    const twitterUsernames = accountsWithoutType.map((accountWithoutType) => {
      return accountWithoutType[0];
    });
    const res = await this.resolveTwitterHandlesQuery(twitterUsernames);

    if (res !== undefined) {
      if (res.data.data) {
        res.data.data.forEach((user: any) => {
          const account = accountsWithoutType.find(
            ([account]) => account.toLowerCase() === user.username.toLowerCase()
          );
          if (account) {
            resolvedAccounts[resolveAccount("1002", user.id)] = account[1];
            updatedAccounts[prefix + ":" + user.username] = account[1];
          }
        });
        // if some accounts haven't been resolved
        if (Object.keys(resolvedAccounts).length < Object.keys(accounts).length) {
          const accountsNotResolved = accounts
            .filter(
              ([account]) => !Object.entries(resolvedAccounts).find(([acc]) => acc === account)
            )
            .map(([account]) => account);
          handleResolvingErrors(
            `Error on these Twitter usernames: ${accountsNotResolved.join(
              ", "
            )}. Are they existing Twitter usernames?`
          );
        }
      }
      if (res.data.errors) {
        res.data.errors.forEach((error: any) => {
          if (error.value) {
            handleResolvingErrors(
              "Error on this Twitter username: " +
                error.value +
                ". Is it an existing Twitter username?"
            );
          } else {
            handleResolvingErrors(
              `Error while fetching ${twitterUsernames}. Are they existing twitter usernames?`
            );
          }
        });
      }
    }

    return [updatedAccounts, resolvedAccounts];
  };

  private async resolveTwitterHandlesQuery(twitterUsernames: string[]): Promise<any> {
    const res = await axios({
      url: `${this.twitterUrl}2/users/by?usernames=${twitterUsernames.join(",")}`,
      method: "GET",
      headers: this.twitterHeaders[Math.floor(Math.random() * this.twitterHeaders.length)],
    }).catch((error) => {
      if (error.response.data.title) {
        if (error.response.data.title.includes("Unauthorized")) {
          throw new Error(
            "Twitter API Key (Bearer Token) invalid or not setup properly. It should be setup as an .env variable called TWITTER_API_KEY.\nYou can go here to register your Twitter API Key (Bearer Token): https://developer.twitter.com/en/docs/authentication/oauth-2-0/application-only.\n"
          );
        } else if (error.response.data.title.includes("Too Many Requests")) {
          throw new Error(
            `Too many requests to Twitter API (${
              error.response.headers["x-rate-limit-limit"]
            } requests). The reset time is at ${new Date(
              error.response.headers["x-rate-limit-reset"] * 1000
            )}`
          );
        }
      }
      if (error.response.data.detail) {
        handleResolvingErrors(
          `Error while fetching ${twitterUsernames}. Are they existing twitter usernames?` +
            " Twitter API error detail: " +
            error.response.data.detail
        );
      } else if (error.response.status && error.response.statusText) {
        handleResolvingErrors(
          `Error while fetching ${twitterUsernames}. Are they existing twitter usernames?` +
            " => Error " +
            error.response.status +
            ": " +
            error.response.statusText
        );
      } else {
        handleResolvingErrors(
          `Error while fetching ${twitterUsernames}. Are they existing twitter usernames?`
        );
      }
      return undefined;
    });

    return res;
  }
}
