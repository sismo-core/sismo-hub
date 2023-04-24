
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
      "wojtek.eth": "1",
      "mtteo.eth": "1",
      "0x0D1AbC745bA6A33e2a3e3AFe8259FDc62B1092Aa": "1",
    };

    return [
      {
        name: "mazury-members",
        timestamp: context.timestamp,
        description: "mazury addresses",
        specs: "mazury addresses to test sismo connect for ethtokyo",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
