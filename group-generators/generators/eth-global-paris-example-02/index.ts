
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
  
    
    const jsonListData0 = {
      "0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f": "1",
      "juliomcruz.eth": "1",
      "twitter:juliomcruz": "1",
    };

    return [
      {
        name: "eth-global-paris-example-02",
        timestamp: context.timestamp,
        description: "ETH Global Paris - example Group 01",
        specs: "ETH Global Paris - example Group 01",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
