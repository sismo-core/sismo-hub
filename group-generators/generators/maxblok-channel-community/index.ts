
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
      "twitter:MaxJurov": "1",
    };

    return [
      {
        name: "maxblok-channel-community",
        timestamp: context.timestamp,
        description: "MaxBlok channel subscribers",
        specs: "MaxBlock channel subscribers https://t.me/max_blok_channel To get this badge you need to subscribe to the channel and leave a comment",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
