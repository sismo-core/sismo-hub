import axios from "axios";
import { FarcasterUser, FarcasterUserVerification } from "./types";
import { retryRequest } from "@group-generators/helpers/data-providers/utils/utils";
import { FetchedData } from "topics/group";

export class FarcasterProvider {
  url: string;
  headers: {
    authorization: string;
    accept: string;
  };

  public constructor() {
    this.url = "https://api.farcaster.xyz/v2/";
    this.headers = {
      authorization: process.env.FARCASTER_API_KEY as string,
      accept: "application/json",
    };
  }

  public async getFarcaster(endpoint: string): Promise<any> {
    const { data: res } = await axios({
      url: this.url + endpoint,
      method: "get",
      headers: this.headers,
    });
    return res;
  }

  public async getTotalNumberOfUsers(): Promise<number> {
    try {
      const res = await this.getFarcaster("recent-users");
      const users: FarcasterUser[] = res.result.users;
      return users[0].fid;
    } catch (error) {
      throw new Error("Error fetching total number of users: " + error);
    }
  }

  public async resolveAddress(context: any, fid: number): Promise<string> {
    // skip the 0 fid because it doesn't exist
    if (fid == 0) {
      return "";
    }
    const res = await context.getFarcaster("verifications?fid=" + fid);
    const verifications: FarcasterUserVerification[] = res.result.verifications;
    // verification address
    if (verifications.length > 0) {
      return verifications[0].address;
    }
    // no verification address
    else {
      return "";
    }
  }

  public async getAllUsers(): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    let profileChunks: Promise<string>[] = [];
    const chunk = 10;
    const chunksWaitTime = 500;
    const numberOfUsers = await this.getTotalNumberOfUsers();

    for (let i = 0; i <= numberOfUsers; i++) {
      profileChunks.push(retryRequest(this.resolveAddress(this, i)));

      if (profileChunks.length % chunk == 0 || i == numberOfUsers) {
        await Promise.all(profileChunks)
          .then((addresses) => {
            addresses.forEach((address) => {
              if (address != "") {
                dataProfiles[address] = 1;
              }
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
        console.log(
          `Farcaster users count: ${Object.keys(dataProfiles).length}`
        );
        profileChunks = [];
        await new Promise((resolve: any) =>
          setTimeout(resolve, chunksWaitTime)
        );
      }
    }

    return dataProfiles;
  }
}
