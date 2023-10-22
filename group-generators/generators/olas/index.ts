
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
      "0x5206Cb0140B3a3C12833e12235d1654Ceec02C94": "1",
      "0xa612b8aA84B7bAeF7fa01d1A6E961d567B7d87B3": "1",
    };

    return [
      {
        name: "olas",
        timestamp: context.timestamp,
        description: "Data Group for olas holders",
        specs: "Data Group for holders of olas",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
