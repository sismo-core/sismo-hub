/* istanbul ignore file */
import axios from "axios";
import { IResolver } from "./resolver";
import { resolveAccount } from "./utils";

export class TwitterResolver implements IResolver {
  twitterUrl: string;
  hiveOneUrl: string;

  twitterHeaders: { Authorization: string }[] = [];
  hiveOneHeaders: { Authorization: string };

  constructor(
    twitterApiKey = process.env.TWITTER_API_KEY,
    hiveOneApiKey = process.env.HIVE_API_KEY
  ) {
    this.twitterUrl = "https://api.twitter.com/";
    this.hiveOneUrl = "https://api.borg.id/";
    this.hiveOneHeaders = {
      Authorization: `Token ${hiveOneApiKey}`,
    };
    const twitterApiKeys = twitterApiKey?.split(",") ?? [];
    twitterApiKeys.map((key) => {
      this.twitterHeaders.push({
        Authorization: `Bearer ${key}`,
      });
    });
  }

  public resolve = async (twitterData: string): Promise<string> => {
    const splitTwitterData = twitterData.split(":");
    if (splitTwitterData.length === 3) {
      const id = twitterData.split(":")[2];
      const resolvedAccount = resolveAccount("1002", id);
      return resolvedAccount;
    }
    try {
      const res = await axios({
        url: `${this.hiveOneUrl}influence/influencers/twitter:${splitTwitterData[1]}`,
        method: "GET",
        headers: this.hiveOneHeaders,
      }).catch((error) => {
        if (error.response.data.error.includes("API Key Invalid")) {
          throw new Error(
            "Hive API Key invalid or not setup properly. It should be passed as an argument when instantiating your Hive provider or as an .env variable called HIVE_API_KEY.\nYou can go here to register your API Key: https://api.signup.borg.id/login.\n"
          );
        }
        throw new Error(
          `Error while fetching ${twitterData}. Is it an existing twitter handle?`
        );
      });
      const resolvedAccount = resolveAccount(
        "1002",
        res.data.social_accounts.social_account.id
      );
      return resolvedAccount;
    } catch {
      const res = await axios({
        url: `${this.twitterUrl}2/users/by/username/${splitTwitterData[1]}`,
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
        }
        throw new Error(
          `Error while fetching ${twitterData}. Is it an existing twitter handle?`
        );
      });
      let resolvedAccount: string;
      try {
        resolvedAccount = resolveAccount("1002", res.data.data.id);
      } catch {
        resolvedAccount = "undefined";
      }
      return resolvedAccount;
    }
  };
}
