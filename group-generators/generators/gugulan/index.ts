
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
      "0x19B1DfBfECBb7EA426095B80061fAe1a69654D6f": "1",
      "0x0B00370899faED6aDCf83b242167498151ccd344": "1",
      "0xD48625B259706F1bCDC7c05006E0f006C902AE59": "1",
    };

    return [
      {
        name: "gugulan",
        timestamp: context.timestamp,
        description: "Our ZK Badge community",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
