/* istanbul ignore file */
import axios from "axios";
import { IResolver } from "./resolver";
import { resolveAccount } from "./utils";

export class TwitterResolver implements IResolver {
  twitterUrl: string;

  twitterHeaders: { Authorization: string }[] = [];

  resolvedAccounts: string[] = [];

  ignoreAccountErrorsWhenResolving = process.env.SH_IGNORE_RESOLVING_ERRORS;

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
    console.log("twitterDataArray", twitterDataArray);
    let twitterDataArrayWithoutIds = twitterDataArray.filter((twitterData) => {
      const splitTwitterData = twitterData.split(":");
      if (splitTwitterData.length === 3) {
        const id = twitterData.split(":")[2];
        this.resolvedAccounts.push(resolveAccount("1002", id));
      }
      return splitTwitterData.length !== 3;
    });

    // remove 'twitter:' from the accounts
    twitterDataArrayWithoutIds = twitterDataArrayWithoutIds.map(
      (twitterData) => {
        return twitterData.split(":")[1];
      }
    );

    console.log(">>> resolvedAccounts", this.resolvedAccounts);
    console.log(">>> twitterDataWithoutIds", twitterDataArrayWithoutIds);

    const resolveTwitterHandles = async (
      twitterData: string[]
    ): Promise<void> => {
      // await this.resolveTwitterHandlesQuery(twitterData).then((res) => {
      //   if (res === undefined) {
      //     throw new Error("Error while resolving Twitter handles");
      //   }

      //   if(res.data !== undefined && res.data.data !== undefined){
      //     res.data.data.forEach((user: any) => {
      //       console.log("user.id", user.id);
      //       this.resolvedAccounts.push(resolveAccount("1002", user.id));
      //     });
      //   }
      //   else if(res.data.errors !== undefined){
      //     res.data.errors.forEach((error: any) => {
      //       if(res.data.errors.value){
      //         this.handleResolvingErrors(error.value);
      //       }
      //       else if (res.data.errors.message){
      //         throw new Error(res.data.errors.message);
      //       }
      //       else {
      //         throw new Error("Error while resolving Twitter handles");
      //       }
      //     });
      //   }
      // });

      const res = await this.resolveTwitterHandlesQuery(twitterData);

      if (res === undefined) {
        throw new Error("Error while resolving Twitter handles");
      }

      if (res.data !== undefined && res.data.data !== undefined) {
        res.data.data.forEach((user: any) => {
          console.log("user.id", user.id);
          this.resolvedAccounts.push(resolveAccount("1002", user.id));
        });
      } else if (res.data.errors !== undefined) {
        res.data.errors.forEach((error: any) => {
          if (res.data.errors.value) {
            this.handleResolvingErrors(error.value);
          } else if (res.data.errors.message) {
            throw new Error(res.data.errors.message);
          } else {
            throw new Error("Error while resolving Twitter handles");
          }
        });
      }
    };

    await this.withConcurrency(
      twitterDataArrayWithoutIds,
      resolveTwitterHandles,
      { concurrency: 2, batchSize: 5 }
    );

    return this.resolvedAccounts;
  };

  public async resolveTwitterHandlesQuery(twitterData: string[]): Promise<any> {
    console.log(twitterData.join(","));
    const res = await axios({
      url: `${this.twitterUrl}2/users/by?usernames=${twitterData.join(",")}`,
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
      return undefined;
    });

    return res;
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

      // si j'ai pas les valeurs qui sont retournées dans l'ordre ou je les ai envoyées, les valeurs de chaque accounts ne correspondrons pas à l'account
      // le Promise.all() retourne les valeurs dans l'ordre ou je les ai envoyées => nice
      const data = await Promise.all(requests);
      array.push(data);
    }

    return array.flat(1);
  }

  public handleResolvingErrors(account: string) {
    const errorMessage = `The data ${account} can't be resolved`;
    if (!this.ignoreAccountErrorsWhenResolving) {
      throw new Error(errorMessage);
    }
  }
}
