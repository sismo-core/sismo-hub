
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
      "0x61077fb77cfd9728cF781D11442cbB60B9383812": "1",
      "0x1a5954C782BE7cd4e8e94e51fe0a9F910d725355": "1",
    };

    return [
      {
        name: "testbadge",
        timestamp: context.timestamp,
        description: "test only",
        specs: "user tester",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
