
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "twitter:0xMartinGbz": "1",
      "twitter:big_q__": "1",
      "twitter:LeopoldSayous": "1",
      "twitter:0xMartinGbz:1": "1",
      "twitter:big_q__:1": "1",
      "twitter:LeopoldSayous:1": "1",
    };

    return [
      {
        name: "twitter-test",
        timestamp: context.timestamp,
        description: "this is a test",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
