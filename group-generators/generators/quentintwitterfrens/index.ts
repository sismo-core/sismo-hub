
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
      "twitter:AhcBen": "1",
      "twitter:lcchql": "1",
      "twitter:PaulWolf": "1",
      "twitter:LeopoldSayous": "1",
    };

    return [
      {
        name: "quentintwitterfrens",
        timestamp: context.timestamp,
        description: "Be part of followers",
        specs: "Be a follower of @QuentinSismo on Twitter",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
