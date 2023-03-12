
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
      "vidhanmangla.eth": "1",
      "0x739819c7704841bd2886CBc1788293C78D255039": "1",
      "0x00c6348827A2572137b5Ba560fFEc72bAbE14A13": "1",
      "0x802C196b50b9E343040da28D08160DAa4Ae6887a": "1",
      "0x30A3f840F5EA8c64D1EFf43dAc2f8053982B7ce2": "1",
    };

    return [
      {
        name: "vidhan-mangla",
        timestamp: context.timestamp,
        description: "Hold a .eth ENS domain.",
        specs: "Not very technical. :)",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
