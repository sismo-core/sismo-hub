
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
      "0x5E32A2B26e5d75234bD5d073eAf9066dF3dc7E5b": "1",
      "twitter:dev_tuna": "1",
      "twitter:ben_pete3": "1",
      "twitter:superwisd1": "1",
    };

    return [
      {
        name: "linkedtrust-devs",
        timestamp: context.timestamp,
        description: "Date Group of linkedtrust developers",
        specs: "Data Group of linekdtrust developers. Trying to integrate Sismo Connect to linkedtrust",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
