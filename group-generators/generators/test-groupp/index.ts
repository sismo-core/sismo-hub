
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
      "0xf553650594834b251648b225ec5790448281e473": "50000",
      "0x228a9d45a362358ccaa4c380586e62933ff4c390": "23000",
      "0x1022794e8fcd336359ff3c681836638d51fa8234": "45000",
      "0xa96bd3e47d7dea707253798f361e0e10215a3fa4": "90000",
      "0xe8187b0899a1855d2bd38d722b23982aba8b0b14": "12000",
    };

    return [
      {
        name: "test-groupp",
        timestamp: context.timestamp,
        description: "USD Token Holders",
        specs: "z",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
