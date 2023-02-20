
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "twitter:gartherly": "1",
      "twitter:dperleberg": "1",
      "twitter:fasterstill": "1",
    };

    return [
      {
        name: "sismo-advertisers",
        timestamp: context.timestamp,
        description: "Hold a Sismo Advertiser POAP, be a verified Sismo Advertiser",
        specs: "Hold a Sismo Advertiser POAP (user Advertiser, user Brand Manager, user Analyst), or be a verified Sismo Advertiser",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
