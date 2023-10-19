
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
      "0xC9Fd509E7969DE8Dbc1b5BfBdFc1418d90C27a3b": "1",
    };

    return [
      {
        name: "sectiontest-nft-owners",
        timestamp: context.timestamp,
        description: "owners of SectionTest NFT",
        specs: "owners of SectionTest NFT can vote proposals",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
