
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
      "0x1452E0c0bFAAe0C8A7927e0Fddc38aC0eFDC2705": "1",
    };

    return [
      {
        name: "huck",
        timestamp: context.timestamp,
        description: "This my is my First Description for a Data Group. 20.05.2023 FF",
        specs: "Does this work?",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
