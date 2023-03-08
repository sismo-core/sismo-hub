import readline from "readline";
import axios from "axios";
import { SocialAccount, ClusterName } from "./types";
import { UserData } from "@group-generators/data-providers/eth-leaderboard/types";
import { RestProvider } from "@group-generators/data-providers/rest-api";
import { FetchedData } from "topics/group";

export class HiveProvider {
  restProvider: RestProvider;
  url: string;

  public constructor() {
    this.url = "https://api.borg.id/";
    this.restProvider = new RestProvider();
  }

  public async getInfluencersFromClusterWithMinimumFollowers(
    clusterName: ClusterName,
    maxQueriedInfluencers = 10000,
    minimumNbOfFollowers = 0
  ): Promise<FetchedData> {
    const influencers: FetchedData = {};
    for await (const account of this._getInfluencersFromClusterWithMinimumFollowers(
      clusterName,
      maxQueriedInfluencers,
      minimumNbOfFollowers
    )) {
      influencers[`twitter:${account.screen_name}:${account.id}`] = 1;
    }
    return influencers;
  }

  public async getInfluencersFromClusterWithMinimumFollowersCount(
    clusterName: ClusterName
  ): Promise<number> {
    const res = await axios({
      url: `${this.url}influence/clusters/${clusterName.clusterName}/influencers`,
      method: "get",
      headers: {
        Authorization: `Token ${process.env.HIVE_API_KEY}`,
      },
    });
    return res.data.total;
  }

  public async *_getInfluencersFromClusterWithMinimumFollowers(
    clusterName: ClusterName,
    maxQueriedInfluencers = 10000,
    minimumNbOfFollowers = 0
  ) {
    // we have 50 results per page on Hive API
    let pageCounter = 0;
    let downloadNumber = 0;
    let lastSocialAccount: SocialAccount = {
      id: 0,
      personal_rank: 0,
      followers_count: 100000000000,
      name: "",
      screen_name: "",
    };
    do {
      const res = await axios({
        url: `${this.url}influence/clusters/${clusterName.clusterName}/influencers/?page=${pageCounter}&sort_by=rank&sort_direction=asc`,
        method: "get",
        headers: {
          Authorization: `Token ${process.env.HIVE_API_KEY}`,
        },
      }).catch((error) => {
        if (error.response.data.error.includes("API Key Invalid")) {
          throw new Error(
            "Hive API Key invalid or not setup properly. It should be passed as an argument when instantiating your Hive provider or as an .env variable called HIVE_API_KEY.\nYou can go here to register your API Key: https://api.signup.borg.id/login.\n"
          );
        }
        console.log(error.response);
        throw new Error("Error while fetching Hive data, is your API Key and url correct?");
      });

      for (const influencer of res.data.influencers) {
        const socialAccount = influencer.identity.social_accounts[0].social_account;
        lastSocialAccount = {
          id: socialAccount.id,
          personal_rank: influencer.personal_rank,
          followers_count: socialAccount.followers_count,
          name: socialAccount.name,
          screen_name: socialAccount.screen_name,
        };
        if (
          lastSocialAccount.followers_count >= minimumNbOfFollowers &&
          lastSocialAccount.personal_rank <= maxQueriedInfluencers
        ) {
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`downloading ... (${downloadNumber})`);
          downloadNumber++;
          yield lastSocialAccount;
        }
      }
      pageCounter++;
    } while (pageCounter < maxQueriedInfluencers / 50);
  }

  public async getTwitterAccountsInCluster(
    clusterName: ClusterName,
    maxQueriedInfluencers = 10000,
    defaultValue = 1
  ): Promise<FetchedData> {
    const twitterAccounts: FetchedData = {};
    for await (const account of this._getInfluencersFromClusterWithMinimumFollowers(
      clusterName,
      maxQueriedInfluencers
    )) {
      twitterAccounts[`twitter:${account.screen_name}:${account.id}`] = defaultValue;
    }
    return twitterAccounts;
  }

  public async getInfluencersAboveMaxRank(
    influencers: UserData[],
    maxRank: number,
    clusterNames: string[] = ["Ethereum"]
  ): Promise<string[]> {
    const hiveFetchFunction = async (user: UserData): Promise<string> => {
      try {
        const res = await this.restProvider.fetchData({
          url: `${this.url}/influence/influencers/twitter:${user.handle}/`,
          method: "get",
          headers: {
            Authorization: `Token ${process.env.HIVE_API_KEY}`,
          },
        });
        const json = JSON.parse(JSON.stringify(res));
        // if the influencer belongs to `clusterName` cluster (e.g. Ethereum cluster on Hive: https://hive.one/c/ethereum)
        // we check that his rank is above maxRank
        // if true we return his ens
        if (json["clusters"]) {
          let index = 0;
          for (const cluster of json["clusters"]) {
            if (clusterNames.includes(cluster.name)) {
              if (parseInt(json["latest_scores"][index].rank) < maxRank) {
                return user.ens;
              }
            }
            index++;
          }
        }
        // else we return an empty string
        return "";
      } catch (error) {
        // else we return an empty string
        return "";
      }
    };

    // we query Hive API with eth leaderboard data
    const ensAccountsExistingonHive = await this.restProvider.withConcurrency(
      influencers,
      hiveFetchFunction,
      { concurrency: 10 }
    );

    return ensAccountsExistingonHive;
  }
}
