
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
      "0x4b5eabCe8F6c9A28f90A6b7FcdbC49E4F4F0b8c5": "1",
      "0x1022794E8FcD336359ff3c681836638D51fa8234": "1",
    };

    return [
      {
        name: "proof-of-baguette",
        timestamp: context.timestamp,
        description: "Data Group of people with French Nationality",
        specs: "Data group of people from France, ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
