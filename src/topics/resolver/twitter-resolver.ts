/* istanbul ignore file */
import axios from "axios";
import { IResolver } from "./resolver";
import { resolveAccount } from "./utils";

export class TwitterResolver implements IResolver {
  twitterUrl: string;
  hiveOneUrl: string;

  twitterHeaders: { Authorization: string };
  hiveOneHeaders: { Authorization: string };

  constructor(
    twitterApiKey = process.env.TWITTER_API_KEY,
    hiveOneApiKey = process.env.HIVE_API_KEY
  ) {
    this.twitterUrl = "https://api.twitter.com/";
    this.hiveOneUrl = "https://api.borg.id/";
    this.twitterHeaders = {
      Authorization: `Bearer ${twitterApiKey}`,
    };
    this.hiveOneHeaders = {
      Authorization: `Token ${hiveOneApiKey}`,
    };
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
        console.log(error);
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
        headers: this.twitterHeaders,
      }).catch((error) => {
        console.log(error);
        throw new Error(
          `Error while fetching ${twitterData}. Is it an existing twitter handle?`
        );
      });
      const resolvedAccount = resolveAccount("1002", res.data.data.id);
      return resolvedAccount;
    }
  };
}
