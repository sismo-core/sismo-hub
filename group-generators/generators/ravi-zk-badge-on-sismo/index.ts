
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
      "0x2a125009E34b9cbC6DC99036DF648666e8108404": "1",
    };

    return [
      {
        name: "ravi-zk-badge-on-sismo",
        timestamp: context.timestamp,
        description: "Ravi zk Badge on Sismo",
        specs: "Connect with the wallet",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
