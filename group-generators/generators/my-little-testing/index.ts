
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
      "dhadrien.eth": "1",
      "ben.anoufa.eth": "1",
    };

    return [
      {
        name: "my-little-testing",
        timestamp: context.timestamp,
        description: "Be a testing user of the Sismo Factory",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
