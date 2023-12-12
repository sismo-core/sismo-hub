
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
      "0xa1b073d5503a27DFBA337cFdb8458b71B3359c74": "1",
      "sudeep.lens": "0",
    };

    return [
      {
        name: "dfadsdf",
        timestamp: context.timestamp,
        description: "sfdsdfdsfsf",
        specs: "sdfsdfsf",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
