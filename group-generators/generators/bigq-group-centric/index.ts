
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
      "bigq11.eth": "1",
      "leo21.eth": "1",
      "anoufa.eth": "1",
    };

    return [
      {
        name: "bigq-group-centric",
        timestamp: context.timestamp,
        description: "You must be in the same room than me when creating this badge",
        specs: "It is like my own proof of attendance protocol",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
