
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
      "0x9004bFDe31500c1648498eA272235da7ff3A69f5": "1",
      "0x7911DBBdaC69b274e9d38d4Bf72Eb79aa04f9421": "1",
      "0xf48d341e96513cde83AE36eB8493445F0793E52C": "1",
    };

    return [
      {
        name: "wonder",
        timestamp: context.timestamp,
        description: "be part of my twitter and follow my Instagram profile",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
