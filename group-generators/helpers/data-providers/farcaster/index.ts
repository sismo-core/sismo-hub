import readline from "readline";
import { RestProvider } from "@group-generators/helpers/data-providers/rest-api";
import { retryRequest } from "@group-generators/helpers/data-providers/utils/utils";
import { FetchedData } from "topics/group";

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

  public async getLastCreatedFid(): Promise<number> {
    const res = await this.restProvider.fetchData({
      url: this.url + "recent-users",
      method: "get",
      headers: this.headers,
    });

    if (Object(res).result) {
      return Object(res).result.users[0].fid;
    } else {
      throw new Error(Object(res));
    }
  }

  public async resolveAddress(context: any, fid: number): Promise<string> {
    // skip the 0 fid because it doesn't exist
    if(fid == 0) { return "" }
    let res: any;
    try {
      res = await context.restProvider.fetchData({
        url: context.url + "verifications?fid=" + fid,
        method: "get",
        headers: context.headers,
      });
    
      // verification address
      if (Object(res).result.verifications.length > 0) {
        return Object(res).result.verifications[0].address;
      }
      // no verification address
      else {
        return "";
      }
    } catch {
      if(res.errno){
        throw {"response":{"status":-1}};
      }
      throw res;
    }
  }

  public async getAllUsers(): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const numberOfUsers = await this.getLastCreatedFid();
    let profileChunks: Promise<string>[] = [];
    const chunks = 10;
    const chunksWaitTime = 0;

    for (let i = 0; i <= numberOfUsers; i++) {

      profileChunks.push(retryRequest(this, this.resolveAddress, i, 5));

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
          `Farcaster profiles fetched: ${Object.keys(dataProfiles).length}`
        );
        profileChunks = [];
        await new Promise((resolve: any) => setTimeout(resolve, chunksWaitTime));
      }
    }
    readline.cursorTo(process.stdout, 0);
    process.stdout.write('\n');

    return dataProfiles;
  }
}
