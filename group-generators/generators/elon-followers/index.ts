import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const twitterProvider = new dataProviders.TwitterProvider();
    
    const twitterProviderData0 = await twitterProvider.getFollowers({
      userID: "1659633330508185607"
    });

    return [
      {
        name: "elon-followers",
        timestamp: context.timestamp,
        description: "Follow @elonmusk on Twitter. Updated daily.",
        specs: "",
        data: twitterProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;