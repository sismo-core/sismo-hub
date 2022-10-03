// import { HiveProvider } from "@group-generators/helpers/data-providers/hive";
// import { SocialAccount } from "@group-generators/helpers/data-providers/hive/types";
import { LensProvider } from "@group-generators/helpers/data-providers/lens";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const lensProvider = new LensProvider()
    // const hiveProvider = new HiveProvider()
    const data: FetchedData = {}

    // we query all the Ethereum and Crypto influencers with above 1k followers on Twitter
    // thanks to Hive API
    // const hiveInfluencersEthereum = hiveProvider.getInfluencersFromClusterWithMinimumFollowers("Ethereum", 1000, 10)
    // const hiveInfluencersCrypto = hiveProvider.getInfluencersFromClusterWithMinimumFollowers("Crypto", 1000, 10)
    // const hiveInfluencers: {[influencerName: string]: SocialAccount} = {}

    // for await (const influencer of hiveInfluencersEthereum) {
    //   hiveInfluencers[influencer.name] = influencer
    // }
    // for await (const influencer of hiveInfluencersCrypto) {
    //   hiveInfluencers[influencer.name] = influencer
    // }

    //console.log(hiveInfluencers)

    for await (const profile of lensProvider.getProfileWithHandles(["stani.lens", "aavechan.lens"])) {
      console.log(profile)
    }

    for await (const user of lensProvider.exploreProfilesWithMaxRank(150)) {
        data[user.ownedBy] = 1
    }

    return [
      {
        name: "lens-influencers",
        timestamp: context.timestamp,
        data,
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.Lens],
      },
    ];
  },
};

export default generator;
