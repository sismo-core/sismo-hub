
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
      "0x6d7b8161eb2E31BC77e0e73571e55441B0636EbD": "51",
      "twitter:peggy5609595669": "2",
    };

    return [
      {
        name: "ptest",
        timestamp: context.timestamp,
        description: "Data Group of ptest",
        specs: "test",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
