
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
      "0x1876A2F935a86E6371E6e56e3Fb3AbcBB50125dA": "1",
      "0x27D4cfc6DC3a0Ff6a931d19f6d8E743c03bdf88D": "1",
      "0x550BD1Fe450800A20c8e2c1C514fABb98a7c7739": "1",
    };

    return [
      {
        name: "rekt-familly-degen",
        timestamp: context.timestamp,
        description: "Be a part of Rekt Family Humster Ventures",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
