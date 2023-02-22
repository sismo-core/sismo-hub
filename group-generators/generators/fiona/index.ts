
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
      "0x0261bbc5eDE0e43445bE977a3961d1de8A6A5408": "1",
      "0x313A8C4E37E0B30Bbb3856066f985dadaADcFBDB": "1",
      "0xC5C94C7130e475dbB567FF07AE99336D7Df79b3e": "1",
    };

    return [
      {
        name: "fiona",
        timestamp: context.timestamp,
        description: "true love",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
