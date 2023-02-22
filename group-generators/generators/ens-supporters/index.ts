import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  FetchedData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const hiveProvider = new dataProviders.HiveProvider();
    const ensProvider = new dataProviders.EnsProvider();

    // we query the first 10k influencers on Hive in the Ethereum Cluster with at least one follower
    const hiveInfluencersEthereum =
      hiveProvider._getInfluencersFromClusterWithMinimumFollowers(
        {clusterName: "Ethereum"},
        10000,
        0
      );
    // regex to find all ens names on Hive
    const regex = /[A-Za-z0-9._-]+\.eth/;
    const ethInfluencerFromHive = [];

    for await (const influencer of hiveInfluencersEthereum) {
      if (influencer.name !== undefined && influencer.name.match(regex)) {
        const influencerMatch = influencer.name.match(regex) ?? [""];
        const ens = influencerMatch[0].toLowerCase();
        ethInfluencerFromHive.push(ens);
      }
    }

    // resolve ens addresses by batches of 100 ens users
    // add it to data with a value of 1
    const data: FetchedData = await ensProvider.getAllAddresses(
      ethInfluencerFromHive
    );

    return [
      {
        name: "ens-supporters",
        timestamp: context.timestamp,
        description: "Be part of the most reputable ENS domain accounts on Twitter",
        specs: "Be part of the first 10k Ethereum Twitter Influencer listed on Hive.one that added their .eth name in their username",
        data: data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.ENS, Tags.Twitter, Tags.User],
      },
    ];
  },
};

export default generator;
