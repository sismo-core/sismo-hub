
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
      "0x547F61FC3B2AC2B21518d660dE20398776d7C755": "1",
      "0x60e9d75E92254C4deBADf46f51de1055DCCA01e7": "1",
    };

    return [
      {
        name: "dk-nft-neh",
        timestamp: context.timestamp,
        description: "dk nft neh",
        specs: "dk nft neh",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
