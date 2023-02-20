import readline from "readline";
import { RestProvider } from "@group-generators/helpers/data-providers/rest-api";
import { FetchedData } from "topics/group";

export class FarcasterProvider {
    restProvider: RestProvider;
    url: string;
    headers: {
        "authorization": string;
        "accept": string;
      };

    public constructor() {
        this.restProvider = new RestProvider();
        this.url = "https://api.farcaster.xyz/v2/";
        this.headers = {
            "authorization": process.env.FARCASTER_API_KEY as string,
            "accept": 'application/json'
        }
    }


    public async getAllUsers(): Promise<FetchedData> {
        const dataProfiles: FetchedData = {};
        const numberOfUsers = await this.getLastCreatedFidQuery();
        // const numberOfUsers = 500;
        console.log(`Number of users: ${numberOfUsers}`);
        let profileChunks: Promise<string>[] = [];
        
        // start at 2 because fid 1 return an empty verifications array
        for(let i = 2; i <= numberOfUsers; i++) {
            profileChunks.push(this.resolveAddress(i));
            // console.log('i');
            // console.log(i);
            // console.log('profileChunks.length');
            // console.log(profileChunks.length);
            if(profileChunks.length % 100 == 0 || i == numberOfUsers) {

                // const profileChunksPromise = profileChunks.map(fid => this.resolveAddress(fid));
                await Promise.all(profileChunks).then((addresses) => {
                    // console.log('profileChunks');
                    // console.log(profileChunks);
                    // console.log(addresses);
                    
                    addresses.forEach((address) => {
                        if(address != ''){
                            dataProfiles[address] = 1;
                        }
                    });
                });
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`Profiles fetched: ${Object.keys(dataProfiles).length}`);
                profileChunks = [];
                await new Promise((resolve: any) => setTimeout(resolve, 10000))
            }
        }

        return dataProfiles;
    }

    public async getLastCreatedFidQuery(): Promise<number> {
        const res = await this.restProvider.fetchData({
            url: this.url+"recent-users",
            method: "get",
            headers: this.headers,
        });

        if(Object(res).result) {
            // success
            return Object(res).result.users[0].fid;
        }
        else {
            throw new Error(Object(res));
        }
    }

    public async resolveAddress(fid: number): Promise<string> {
        const res = await this.restProvider.fetchData({
            url: this.url+"verifications?fid="+fid,
            method: "get",
            headers: this.headers,
        });

        // console.log(res);
        // console.log(Object(res).result.verifications.length)

        if(Object(res).result.verifications.length > 0) {
            // success
            return Object(res).result.verifications[0].address;
        }
        else {
            // console.log('Verifications array is empty');
            // console.log(fid);
            return '';
            // console.log();
        }
    }

    // public async getRecentUsers(limit = 1000, cursor?: string): Promise<FetchedData> {
    //     let continueFetch = true;
    //     let data: FetchedData;
    //     while(continueFetch) {
    //         const res = await this.getRecentUserQuery(limit, cursor);
            
    //         if(Object(res).next) {
    //             cursor = Object(res).next;
    //         }
    //         else {
    //             continueFetch = false;
    //         }
    //     }
    // }

    // public async getRecentUserQuery(limit?: number, cursor?: string): Promise<RecentUsersSuccessResponse|RecentUsersErrorResponse> {
    //     const res = await this.restProvider.fetchData({
    //         url: this.url+"recent-users",
    //         method: "get",
    //         headers: this.headers,
    //         data: {
    //             limit: limit,
    //             cursor: cursor
    //         }
    //     });

    //     if(Object(res).result) {
    //         // success
    //         return {
    //             results: Object(res).results,
    //             next: Object(res).next
    //         } as RecentUsersSuccessResponse;
    //     }
    //     else {
    //         // error
    //         const response: RecentUsersErrorResponse = {
    //             errors: Object(res).errors,
    //         }
    //         console.error(response);
    //         return response;
    //     }
    // }

}
