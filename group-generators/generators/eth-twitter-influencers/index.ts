import { dataProviders } from "@group-generators/helpers/data-providers";
import { UserData } from "@group-generators/helpers/data-providers/eth-leaderboard/types";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const ethLeaderboardProvider = new dataProviders.EthLearderboardProvider()
    const hiveProvider = new dataProviders.HiveProvider()
    const ensProvider = new dataProviders.EnsProvider();


    // we query the first 10,000 influencers on eth leaderboard
    const ethLeaderboardInfluencers: UserData[] = await ethLeaderboardProvider.getInfluencers(10000)

    // we query Hive API with eth leaderboard data and keep only those with a Hive rank < 10000 and more than 1k followers
    const ensAccountsExistingonHive = await hiveProvider.getInfluencersAboveMaxRank(ethLeaderboardInfluencers, 10000, ["Ethereum"]);

    // resolve ens addresses by batches of 100 ens users
    // add it to data with a value of 1
    const data : FetchedData = await ensProvider.getAllAddresses(ensAccountsExistingonHive)

    return [
      {
        name: "eth-twitter-influencers",
        timestamp: context.timestamp,
        data: data,
        valueType: ValueType.Score,
        tags: [Tags.ENS, Tags.Twitter, Tags.User],
      },
    ];
  },
};

export default generator;
