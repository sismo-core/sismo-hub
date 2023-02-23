
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "alixkun.eth": "1",
      "mdcl.eth": "1",
      "0x07f63784261e4Eb7484447497f33682d4e25902A": "1",
      "mattwood.eth": "1",
    };

    return [
      {
        name: "everwave-founder",
        timestamp: context.timestamp,
        description: "is part of the everwave founding members",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
