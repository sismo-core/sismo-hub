import readline from "readline";
import { RestProvider } from "@group-generators/helpers/data-providers/rest-api";
import { FetchedData } from "topics/group";
import console from "console";

export class FarcasterProvider {
  restProvider: RestProvider;
  url: string;
  headers: {
    authorization: string;
    accept: string;
  };

  public constructor() {
    this.restProvider = new RestProvider();
    this.url = "https://api.farcaster.xyz/v2/";
    this.headers = {
      authorization: process.env.FARCASTER_API_KEY as string,
      accept: "application/json",
    };
  }


  public async getAllUsers(): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const numberOfUsers = await this.getLastCreatedFid();
    let profileChunks: Promise<string>[] = [];
    const chunks = 100;
    const chunksWaitTime = 10000;
    const chunksWaitRetry = 10000;

    const retryRequest = async (fid: number, numberOfRetry=5) => {
      let error;
      for (let i = 0; i < numberOfRetry; i++) {
        try {
          return await this.resolveAddress(fid);
        } catch (err) {
          // console.log("---------------res");
          // console.log(err);
          await new Promise((resolve: any) => setTimeout(resolve, chunksWaitRetry))
        }
      }
      throw new Error('Max retry reached+\n' + error);
    }

    for (let i = 1; i <= numberOfUsers; i++) {
      
      profileChunks.push(retryRequest(i));

      if (profileChunks.length % chunks == 0 || i == numberOfUsers) {
        await Promise.all(profileChunks)
        .then((addresses) => {
          addresses.forEach((address) => {
            if (address != "") {
              dataProfiles[address] = 1;
            }
          });
        })
        .catch(error => {throw new Error(error)})
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(
          `Profiles fetched: ${Object.keys(dataProfiles).length}`
        );
        profileChunks = [];
        await new Promise((resolve: any) => setTimeout(resolve, chunksWaitTime));
      }

    }
    return dataProfiles;
  }

  public async getLastCreatedFid(): Promise<number> {
    const res = await this.restProvider.fetchData({
      url: this.url + "recent-users",
      method: "get",
      headers: this.headers,
    });

    if (Object(res).result) {
      // success
      return Object(res).result.users[0].fid;
    } else {
      throw new Error(Object(res));
    }
  }

  public async resolveAddress(fid: number): Promise<string> {
    const res = await this.restProvider.fetchData({
      url: this.url + "verifications?fid=" + fid,
      method: "get",
      headers: this.headers,
    });

    if (Object(res).result.verifications.length > 0) {
      return Object(res).result.verifications[0].address;
    } else {
      return "";
    }
  }
}
