
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
      "0xd522B0aEb1367579F6d2ef2166d77736cDc1Ed3B": "1",
    };

    return [
      {
        name: "mbank-builders",
        timestamp: context.timestamp,
        description: "Community of Bank Of Georgia mBank builders",
        specs: "Contributor of mBank",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
