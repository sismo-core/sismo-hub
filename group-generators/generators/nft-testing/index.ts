
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0xbaf502F416AEED726883832B76322001034aaD92": "1",
      "0x547F61FC3B2AC2B21518d660dE20398776d7C755": "1",
    };

    return [
      {
        name: "nft-testing",
        timestamp: context.timestamp,
        description: "nft testing",
        specs: "nft testing",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
