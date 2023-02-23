
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
      "0xC03C95142f718d4655baBD7CC03dFE1bf592C0a3": "1",
      "0x8dC5362f76d7D81A5Ac36EC7D168E42405f4d178": "1",
    };

    return [
      {
        name: "lrcrypto",
        timestamp: context.timestamp,
        description: "early zkbadges",
        specs: "user tester",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
