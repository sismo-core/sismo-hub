import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const sismoTwitterUserID = "1438226914309812226";

    const twitterProvider = new dataProviders.TwitterProvider();

    const twitterProviderData0 = await twitterProvider.getFollowers(
      sismoTwitterUserID
    );

    return [
      {
        name: "sismo-twitter-followers",
        timestamp: context.timestamp,
        description: "Follow @Sismo_eth on Twitter. Updated daily.",
        specs: "",
        data: twitterProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;