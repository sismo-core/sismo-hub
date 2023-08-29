
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
      "0x13a6D1fe418de7e5B03Fb4a15352DfeA3249eAA4": "1",
    };

    return [
      {
        name: "dataverse-test-lyf",
        timestamp: context.timestamp,
        description: "Data Group of Test sismo reputations sdk demo",
        specs: "Data Group of Test sismo reputations sdk demo.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
