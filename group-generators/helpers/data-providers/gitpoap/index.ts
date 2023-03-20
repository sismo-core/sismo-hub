import axios from "axios";
import { GitPoapAddresses, GitPoapEventId } from "./types";
import { FetchedData } from "topics/group";

export class GitPoapProvider {
  url: string;

  public constructor() {
    this.url = "https://public-api.gitpoap.io";
  }

  private async getGitPoap(endpoint: string): Promise<any> {
    const { data: res } = await axios({
      url: this.url + endpoint,
      method: "get",
    });
    return res;
  }

  public async getGitPoapHoldersByEventId({
    gitPoapEventId,
  }: GitPoapEventId): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    let holdersAddress: string[];
    try {
      const req: GitPoapAddresses = await this.getGitPoap(
        "/v1/gitpoaps/" + gitPoapEventId + "/addresses"
      );
      holdersAddress = req.addresses;
    } catch (error) {
      throw new Error("Error fetching total number of users: " + error);
    }

    await Promise.all(holdersAddress).then((addresses) => {
      addresses.forEach((address) => {
        if (address != "") {
          dataProfiles[address] = 1;
        }
      });
    });

    return dataProfiles;
  }

  public async getGitPoapHoldersByEventIdCount({
    gitPoapEventId,
  }: GitPoapEventId): Promise<number> {
    const holders = this.getGitPoapHoldersByEventId({ gitPoapEventId });
    return Object(holders).keys().length;
  }
}
