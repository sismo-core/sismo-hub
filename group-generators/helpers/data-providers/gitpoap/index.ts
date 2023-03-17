import axios from "axios";
import { GitPoap, GitPoapAddresses } from "./types";
import { FetchedData } from "topics/group";


// fixes https://github.com/sismo-core/sismo-hub/issues/1454
// api docs https://docs.gitpoap.io/api

export class GitPoapProvider {
  url: string;


  public constructor() {
    this.url = "https://public-api.gitpoap.io/";
  }

  async getGitPoap(endpoint: string): Promise<any> {
    const { data: res } = await axios({
      url: this.url + endpoint, 
      method: "get",
    });
    return res;
  }


  public async getGitPoapHoldersByEventId(gitPoapEventId: string ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    let holdersAddress: string[];
    try {
      const req: GitPoapAddresses= await this.getGitPoap("/v1/gitpoaps/" + gitPoapEventId + "/addresses"); 
      holdersAddress = req.addresses;
    } catch (error) {
      throw new Error("Error fetching total number of users: " + error);
    }

    await Promise.all(holdersAddress)
    .then((addresses) => {
      addresses.forEach((address) => {
        if (address != "") {
          dataProfiles[address] = 1;
        }
      });
    });

    return dataProfiles;
  }

  public async getGitPoapHoldersByEventIdCount(gitPoapEventId: string): Promise<number> {
    const  holders = this.getGitPoapHoldersByEventId(gitPoapEventId);
    return Object(holders).keys().length;
  }

  public async getGitPoapEventsIDByAddress(address: string ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const gitPoapEventsID: number[] = [];
    try {
      const req: GitPoap[]= await this.getGitPoap("/v1/address/" + address + "/gitpoaps");
      for (let index = 0; index < req.length; index++) {
        gitPoapEventsID.push(req[index].gitPoapEventId);
      }
      
    } catch (error) {
      throw new Error("Error fetching total number of users: " + error);
    }

    await Promise.all(gitPoapEventsID)
    .then((events) => {
      events.forEach((event) => {
        if (event != 0) {
          gitPoapEventsID[event] = 1;
        }
      });
    });

    return dataProfiles;
  }


  public async getGitPoapEventsIDByAddressCount(address: string): Promise<number> {
    const  gitPoaps = this.getGitPoapEventsIDByAddress(address);
    return Object(gitPoaps).keys().length;
  }

}
