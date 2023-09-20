
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0x00f8C039BBc88085f07f9aA1e92DEdc8BBE01CC8": "10",
    };

    return [
      {
        name: "amount-deposited",
        timestamp: context.timestamp,
        description: "Money detained for each user",
        specs: "Data group that contains the amount of money available for each account.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
