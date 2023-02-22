
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
      "0x4e3aA6092cD50DdaFcB3e091990EDE029F18653B": "1",
    };

    return [
      {
        name: "proof-of-loneliness",
        timestamp: context.timestamp,
        description: "Be the only person who can mint this badge.",
        specs: "The only thing to do is be the only one who can claim this badge. ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
