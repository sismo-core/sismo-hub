import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {

    const latestEthTwitterInfluencers = await groupStore.latest("eth-twitter-influencers")
    const latestLensInfluencers = await groupStore.latest("lens-influencers")

    const ethTwitterInfluencers = await latestEthTwitterInfluencers.data()
    const lensInfluencers = await latestLensInfluencers.data()

    const data = dataOperators.Union([ethTwitterInfluencers, lensInfluencers])

    return [
      {
        name: "eth-influencers",
        timestamp: context.timestamp,
        data,
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.Lens],
      },
    ];
  },
};

export default generator;
