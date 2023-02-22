
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
      "0x0AA28029FD455F21f3cC1856fA16403e782d0f41": "1",
      "0x3b51b4cd1043c3cabA04f0CEDb46aDD945312b0c": "1",
    };

    return [
      {
        name: "sysmotestbadge1",
        timestamp: context.timestamp,
        description: "be part of the test",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
