
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
      "0x631563241c1B8988ba3922255B2fA3B5C231dB8b": "1",
    };

    return [
      {
        name: "twitter-follower",
        timestamp: context.timestamp,
        description: "Be a subscriber @Dash_6789",
        specs: "Be a subscriber @Dash_6789",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
