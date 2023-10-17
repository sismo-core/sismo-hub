
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
      "0x6d7b8161eb2E31BC77e0e73571e55441B0636EbD": "1",
      "twitter:develoer": "2",
    };

    return [
      {
        name: "ptest-kyc3",
        timestamp: context.timestamp,
        description: "ptest-kyc3",
        specs: "ptest-kyc3",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
