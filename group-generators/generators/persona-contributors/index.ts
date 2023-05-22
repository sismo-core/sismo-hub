
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
      "github:danieloadebimpe": "1",
      "github:marrmee": "1",
      "github:yasublockchain": "1",
      "github:0xheartcode": "1",
    };

    return [
      {
        name: "persona-contributors",
        timestamp: context.timestamp,
        description: "data group of persona contributors",
        specs: "being a collaborator of the persona repository ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
