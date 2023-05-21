
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
      "0x18CD59BA3d5D09D0653F8893787890c61ADc1F0e": "1",
      "0xC98bd8b992a7AF9f166b62e265e02125D8DAf72b": "1",
    };

    return [
      {
        name: "swissdao",
        timestamp: context.timestamp,
        description: "We are swissDAO members",
        specs: "come visit us in switzerland or visit us in the metaverse on MetaRoom.City (hey Sismo! you need a metaRoom!)",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
