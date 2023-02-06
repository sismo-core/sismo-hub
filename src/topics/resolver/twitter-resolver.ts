/* istanbul ignore file */
import axios from "axios";
import { IResolver } from "./resolver";
import { resolveAccount } from "./utils";

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

  public resolve = async (twitterData: string): Promise<string> => {
    const splitTwitterData = twitterData.split(":");
    if (splitTwitterData.length === 3) {
      const id = twitterData.split(":")[2];
      const resolvedAccount = resolveAccount("1002", id);
      return resolvedAccount;
    }

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
      console.log(
        `Error while fetching ${twitterData}. Is it an existing twitter handle?`
      );
      return undefined;
    });

    if (res === undefined) {
      return "undefined";
    }

    const resolvedAccount =
      res.data === undefined || res.data.data === undefined
        ? "undefined"
        : resolveAccount("1002", res.data.data.id);

    return resolvedAccount;
  };
}
