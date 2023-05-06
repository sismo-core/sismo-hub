
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
      "0x9b4d500a828dced5c7ea59c43a918dc05fb556a3": "1",
    };

    return [
      {
        name: "op",
        timestamp: context.timestamp,
        description: "拥有至少10个op quests NFT以上的",
        specs: "拥有至少10个op quests NFT以上的地址",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
