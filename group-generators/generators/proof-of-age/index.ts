
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
      "0x1022794E8FcD336359ff3c681836638D51fa8234": "25",
      "0x4b5eabCe8F6c9A28f90A6b7FcdbC49E4F4F0b8c5": "32",
      "0xe8187b0899A1855d2BD38D722b23982ABa8b0B14": "21",
    };

    return [
      {
        name: "proof-of-age",
        timestamp: context.timestamp,
        description: "Data group representing age of people",
        specs: "Data group representing age of people",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
