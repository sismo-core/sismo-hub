
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
      "0x44e70f11df67Dd29d3E16218e0C9B334e1e1a6D6": "1",
      "0x2a125009E34b9cbC6DC99036DF648666e8108404": "1",
    };

    return [
      {
        name: "anav-s-trial",
        timestamp: context.timestamp,
        description: "Attend Anav's demo",
        specs: "Just for demo purposes.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
