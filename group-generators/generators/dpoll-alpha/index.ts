
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
      "0xeB765B7393e95D13aFb35568Fe5bb08d60bD6a40": "1",
      "0xED7ea3D97F6E6d3E0777C431636e41e7F75A544f": "1",
      "0xcB7eA0eC36670AA13088C4372fe8636D4D2b574f": "1",
    };

    return [
      {
        name: "dpoll-alpha",
        timestamp: context.timestamp,
        description: "Data group of eligible users on Dpolll",
        specs: "Hold a Dpoll zkBadge and answer to polls on Dpoll.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
