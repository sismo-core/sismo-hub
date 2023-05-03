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

  public resolve = async (twitterDataArray: string[]): Promise<string[]> => {
    // const resolvedAccounts: string[] = [];
    // console.log("twitterDataArray", twitterDataArray)
    // const twitterDataWithoutIds = twitterDataArray.filter((twitterData) => {
    //   const splitTwitterData = twitterData.split(":");
    //   if (splitTwitterData.length === 3) {
    //     const id = twitterData.split(":")[2];
    //     resolvedAccounts.push(resolveAccount("1002", id));
    //   }
    //   return splitTwitterData.length !== 3
    // })

    // console.log("resolvedAccounts", resolvedAccounts);
    // console.log("twitterDataWithoutIds", twitterDataWithoutIds);

    // this.withConcurrency(twitterDataWithoutIds, this.resolveTwitterHandles, {concurrency: 5, batchSize: 1});

    const twitterData = twitterDataArray[0];
    const splitTwitterData = twitterData.split(":");
    if (splitTwitterData.length === 3) {
      const id = twitterData.split(":")[2];
      const resolvedAccount = resolveAccount("1002", id);
      return [resolvedAccount];
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
      if (error.response.data.title.includes("Too Many Requests")) {
        throw new Error(
          `Too many requests to Twitter API (${
            error.response.headers["x-rate-limit-limit"]
          } requests). The reset time is at ${new Date(
            error.response.headers["x-rate-limit-reset"] * 1000
          )}`
        );
      }

      console.log(
        `Error while fetching ${twitterData}. Is it an existing twitter handle?`
      );
      return undefined;
    });

    if (res === undefined) {
      return ["undefined"];
    }

    const resolvedAccount =
      res.data === undefined || res.data.data === undefined
        ? "undefined"
        : resolveAccount("1002", res.data.data.id);

    return [resolvedAccount];
  };

  public async resolveTwitterHandles(): Promise<void> {
    console.log("resolveTwitterHandles");
  }

  public async withConcurrency<T, K>(
    myItemArray: T[],
    fn: (items: T[]) => Promise<K>,
    { concurrency = 5, batchSize = 1 }
  ) {
    const array: K[][] = [];
    console.log("myItemArray", myItemArray);

    for (
      let batchStart = 0;
      batchStart < myItemArray.length;
      batchStart += batchSize * concurrency
    ) {
      const requests: Promise<K>[] = [];

      for (
        let i = batchStart;
        i < batchStart + batchSize * concurrency && i < myItemArray.length;
        i += batchSize
      ) {
        const itemsBatch = myItemArray.slice(
          i,
          Math.min(i + batchSize, myItemArray.length)
        );
        console.log("itemsBatch", itemsBatch);
        requests.push(fn(itemsBatch));
      }

      const data = await Promise.all(requests);
      array.push(data);
    }

    return array.flat(1);
  }
}
