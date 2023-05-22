/* istanbul ignore file */
import axios from "axios";
import { BigNumberish } from "ethers";
import { IResolver } from "./resolver";
import {
  resolveAccount,
  withConcurrency,
  handleResolvingErrors,
} from "./utils";
import { FetchedData } from "topics/group";

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

  public resolve = async (accounts: FetchedData): Promise<FetchedData> => {
    const alreadyResolvedAccounts: FetchedData = {};

    // extract twitter usernames already resolved
    let unresolvedAccounts = Object.entries(accounts).filter(
      ([account, value]) => {
        const accountsWithoutValues = account.split(":");
        if (accountsWithoutValues.length === 3) {
          const id = account.split(":")[2];
          alreadyResolvedAccounts[resolveAccount("1002", id)] = value;
        }
        return accountsWithoutValues.length !== 3;
      }
    );

    // remove 'twitter:' from the accounts
    unresolvedAccounts = unresolvedAccounts.map((accountWithType) => {
      return [accountWithType[0].split(":")[1], accountWithType[1]];
    });

    const resolvedAccountsArray = await withConcurrency(
      unresolvedAccounts,
      this.resolveTwitterHandles,
      {
        concurrency: 20,
        batchSize: 100,
      }
    );

    let resolvedAccounts = resolvedAccountsArray.reduce(
      (accumulator, currentObject) => {
        return { ...accumulator, ...currentObject };
      },
      {}
    );

    resolvedAccounts = { ...resolvedAccounts, ...alreadyResolvedAccounts };

    return resolvedAccounts;
  };

  private resolveTwitterHandles = async (
    unresolvedAccounts: [string, BigNumberish][]
  ): Promise<FetchedData> => {
    const resolvedAccounts: FetchedData = {};

    // get only the twitter usernames
    const twitterAccounts = unresolvedAccounts.map((accountsWithoutValues) => {
      return accountsWithoutValues[0];
    });

    const res = await this.resolveTwitterHandlesQuery(twitterAccounts);

    if (res !== undefined) {
      if (res.data.data) {
        res.data.data.forEach((user: any) => {
          const account = unresolvedAccounts.find(
            ([account]) => account === user.username
          );
          if (account) {
            resolvedAccounts[resolveAccount("1002", user.id)] = account[1];
          }
        });
      }
      if (res.data.errors) {
        // when only 1 account is resolved, the client don't catch the error
        res.data.errors.forEach((error: any) => {
          if (error.detail) {
            handleResolvingErrors(error.detail);
          }
        });
      }
    }

    return resolvedAccounts;
  };

  private async resolveTwitterHandlesQuery(
    twitterAccounts: string[]
  ): Promise<any> {
    const res = await axios({
      url: `${this.twitterUrl}2/users/by?usernames=${twitterAccounts.join(
        ","
      )}`,
      method: "GET",
      headers:
        this.twitterHeaders[
          Math.floor(Math.random() * this.twitterHeaders.length)
        ],
    }).catch((error) => {
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
      if (error.response.data.detail) {
        handleResolvingErrors(
          "Twitter Error detail: " +
            error.response.data.detail +
            ` Error while fetching ${twitterAccounts}. Are they existing twitter handles?`
        );
      } else {
        handleResolvingErrors(
          `Error while fetching ${twitterAccounts}. Are they existing twitter handles?`
        );
      }
      return undefined;
    });

    return res;
  }
}
