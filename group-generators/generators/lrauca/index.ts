
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
      "0xFCC24c9028334025b84F93fB2a77cb87b3a7D1CA": "1",
      "0xe062667442b118FD908573764C742b32124b7000": "1",
      "0x1D108A4a08a0aBEEe6c5469196C8463Cc1262467": "1",
    };

    return [
      {
        name: "lrauca",
        timestamp: context.timestamp,
        description: "Be part of Sismo project",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
