
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
      "0x240f567956185306181F517e9BbF846B930e595c": "1",
    };

    return [
      {
        name: "sismo-engineers",
        timestamp: context.timestamp,
        description: "Data Group of Engineers working at Sismo",
        specs: "Pass the interview and be employed as an engineer at Sismo",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
