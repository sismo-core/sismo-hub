
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
      "0x5EC39662ffC0cb4777F8DFAF358AeDF11C1c3a31":"1",
    };

    return [
      {
        name: "test-69420",
        timestamp: context.timestamp,
        description: "NA",
        specs: "NA",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
