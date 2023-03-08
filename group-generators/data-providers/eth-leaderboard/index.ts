import { User, UserData } from "./types";
import { RestProvider } from "@group-generators/data-providers/rest-api";

export class EthLeaderboardProvider {
  restProvider: RestProvider;
  url: string;

  public constructor() {
    this.restProvider = new RestProvider();
    this.url = "https://ethleaderboard.xyz/api/frens";
  }

  public async getInfluencers(nbOfInfluencers: number): Promise<UserData[]> {
    const ethLeaderboardFetchFunction = async (number: number) : Promise<UserData[]> => {
      const ethLeaderBoardAPiData = await this.restProvider.fetchData({
        url: `${this.url}?skip=${number * 500}&count=500`,
        method: "get",
      });

      const batchData : UserData[] = Object.values(ethLeaderBoardAPiData)[0].map(
        (user: User) => {
          return {
            ens: user.ens,
            handle: user.handle,
          };
        }
      );

      console.log(`Batch ${number} queried`)
      return batchData;
    }

    const ethLeaderboardData : UserData[][] = await this.restProvider.withConcurrency([...Array(Math.trunc(nbOfInfluencers/500) + 1).keys()], ethLeaderboardFetchFunction, {concurrency: 2})

    return ethLeaderboardData.flat(1).slice(0, nbOfInfluencers);
  }
}
