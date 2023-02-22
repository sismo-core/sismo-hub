import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  AccountSource,
  FetchedData,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const hiveProvider = new dataProviders.HiveProvider();

    const twitterEthereumInfluencersPower3: FetchedData =
      await hiveProvider.getTwitterAccountsInCluster({clusterName: "ethereum"}, 1000, 3);

    const twitterEthereumInfluencersPower2: FetchedData =
      await hiveProvider.getTwitterAccountsInCluster({clusterName: "ethereum"}, 5000, 2);

    const twitterEthereumInfluencersPower1: FetchedData =
      await hiveProvider.getTwitterAccountsInCluster({clusterName: "ethereum"}, 20000, 1);

    const data: FetchedData = dataOperators.Union([
      twitterEthereumInfluencersPower1,
      twitterEthereumInfluencersPower2,
      twitterEthereumInfluencersPower3,
    ]);

    return [
      {
        name: "twitter-ethereum-influencers",
        timestamp: context.timestamp,
        description: "Be part of the Ethereum Influencers on Twitter listed by Hive.one",
        specs: "Badge Level 1: Be part of the Ethereum Influencers on Twitter listed by Hive.one. Badge Level 2: Be part of the first 5K Ethereum Influencers on Twitter listed by Hive.one. Badge Level 3: Be part of the first 1K Ethereum Influencers on Twitter listed by Hive.one.",
        data,
        accountSources: [AccountSource.TWITTER],
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.Twitter],
      },
    ];
  },
};

export default generator;
