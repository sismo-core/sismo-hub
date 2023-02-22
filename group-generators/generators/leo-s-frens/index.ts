
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
      "dhadrien.sismo.eth": "1",
      "leo21.eth": "1",
      "bigq11.eth": "1",
      "ben.anoufa.eth": "1",
    };

    return [
      {
        name: "leo-s-frens",
        timestamp: context.timestamp,
        description: "Be part of leo's friends",
        specs: "We should have already met IRL ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
