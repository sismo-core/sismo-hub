
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
      "0xcbeE6DdA2347C0EC0e45870d4D6cf3526a2E319C": "1",
      "0xf5A7948EC1835d5eFb333c4Ab1f75ed110E44223": "1",
    };

    return [
      {
        name: "developer-of-faust",
        timestamp: context.timestamp,
        description: "Developer's wallet address of Faust.",
        specs: "Developer's wallet address of Faust.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
