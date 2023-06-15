
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
      "0x6d4F97bC946e75b3E7ECDd88deDaCbe46Cd41870": "1",
      "0x7152Cd3891d5B80CA162BBb807e2d4310c084207": "1",
    };

    return [
      {
        name: "retrodao-royal-kol-invited-zk-badge",
        timestamp: context.timestamp,
        description: "Recommand KOL",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
