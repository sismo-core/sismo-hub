
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
      "leo21.eth": "1",
    };

    return [
      {
        name: "leo-test-badge",
        timestamp: context.timestamp,
        description: "test leo",
        specs: "testtest",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
