
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
      "0x9b58d0aD3CC84dF8b5313c36cE160df2b9397E35": "1",
      "0x99999658D7D3f75ed57efE64E5FE37aa9df3d19E": "1",
    };

    return [
      {
        name: "ktst",
        timestamp: context.timestamp,
        description: "Data group",
        specs: "Testing purposes",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
