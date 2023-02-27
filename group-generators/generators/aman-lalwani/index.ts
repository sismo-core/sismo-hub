
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
      "0xEB6f0E46E5A3bfFBc1902d5AeD13d9236f5CAcA7": "1",
    };

    return [
      {
        name: "aman-lalwani",
        timestamp: context.timestamp,
        description: "My first ZK Badge",
        specs: "I am a web3/crypto Product Manager",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
