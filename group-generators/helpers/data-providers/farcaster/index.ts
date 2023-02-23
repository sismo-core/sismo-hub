// import readline from "readline";
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
  
  public async getAllUsers(): Promise<FetchedData> {
    const refactorData = (addresses: any, dataProfiles: any) => {
      let continueFetch = false;
      addresses.forEach((address: any) => {
        if (address != "error") {
          if(address == "") {
            continueFetch = true;
          }
          else {
            dataProfiles[address] = 1;
          }
        }
      });
      return {"continueFetch":continueFetch, "dataProfiles": dataProfiles};
    }

    const dataProfiles: FetchedData = await retryRequest(this, this.resolveAddress, refactorData, 10, 100);
    return dataProfiles;
  }

  public async resolveAddress(context: any, fid: number): Promise<string> {
    if(fid == 0) {
      return "";
    }
    const res: any = await context.restProvider.fetchData({
      url: context.url + "verifications?fid=" + fid,
      method: "get",
      headers: context.headers,
    });
    // request error
    if(Object(res.response).status) {
      if (Object(res.response).status == 400) {
        return "error";
      }
      else {
        throw Object(res.response).status;
      }
    }
    // request success + get profile
    else if (Object(res).result.verifications.length > 0) {
      return Object(res).result.verifications[0].address;
    }
    // no verification address
    else {
      return "";
    }
  }


  // public async getLastCreatedFid(): Promise<number> {
  //   const res = await this.restProvider.fetchData({
  //     url: this.url + "recent-users",
  //     method: "get",
  //     headers: this.headers,
  //   });

  //   if (Object(res).result) {
  //     return Object(res).result.users[0].fid;
  //   } else {
  //     throw new Error(Object(res));
  //   }
  // }


  // public async getAllUsers(): Promise<FetchedData> {
  //   const dataProfiles: FetchedData = {};
  //   const numberOfUsers = await this.getLastCreatedFid();
  //   let profileChunks: Promise<string>[] = [];
  //   const chunks = 100;
  //   const chunksWaitTime = 0;
  //   const chunksWaitRetry = 10000;

  //   const retryRequest = async (fid: number, numberOfRetry=5) => {
  //     let error;
  //     for (let i = 0; i < numberOfRetry; i++) {
  //       try {
  //         return await this.resolveAddress(fid);
  //       } catch (err: any) {
  //         if(err.response.status == 429) {
  //           await new Promise((resolve: any) => setTimeout(resolve, chunksWaitRetry));
  //         }
  //       }
  //     }
  //     throw new Error('Max retry reached\n' + error);
  //   }

  //   for (let i = 1; i <= numberOfUsers; i++) {
      
  //     profileChunks.push(retryRequest(i));

  //     if (profileChunks.length % chunks == 0 || i == numberOfUsers) {
  //       await Promise.all(profileChunks)
  //       .then((addresses) => {
  //         addresses.forEach((address) => {
  //           if (address != "") {
  //             dataProfiles[address] = 1;
  //           }
  //         });
  //       })
  //       .catch(error => {throw new Error(error)})
  //       readline.cursorTo(process.stdout, 0);
  //       process.stdout.write(
  //         `Profiles fetched: ${Object.keys(dataProfiles).length}\n`
  //       );
  //       profileChunks = [];
  //       await new Promise((resolve: any) => setTimeout(resolve, chunksWaitTime));
  //     }

  //   }
  //   return dataProfiles;
  // }

  // public async getLastCreatedFid(): Promise<number> {
  //   const res = await this.restProvider.fetchData({
  //     url: this.url + "recent-users",
  //     method: "get",
  //     headers: this.headers,
  //   });

  //   if (Object(res).result) {
  //     return Object(res).result.users[0].fid;
  //   } else {
  //     throw new Error(Object(res));
  //   }
  // }

  // public async resolveAddress(fid: number): Promise<string> {
  //   console.log('azertyuiop');
  //   console.log(this.url);
  //   const res: any = await this.restProvider.fetchData({
  //     url: this.url + "verifications?fid=" + fid,
  //     method: "get",
  //     headers: this.headers,
  //   });

  //   console.log('------------- res');
  //   console.log(res);

  //   if(Object(res.response).status == 429) {
  //     throw Object(res);
  //   }
  //   else if (Object(res).result.verifications.length > 0) {
  //     return Object(res).result.verifications[0].address;
  //   }
  //   else {
  //     return "";
  //   }
  // }
}
