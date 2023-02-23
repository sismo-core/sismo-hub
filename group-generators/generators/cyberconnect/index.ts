
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
      "0x7927f89670F942169476b006966dd6ECCdc7425c": "1",
    };

    return [
      {
        name: "cyberconnect",
        timestamp: context.timestamp,
        description: "CyberConnect Ambassador",
        specs: "Those who own the Ambassador role in CyberConnect Discord are eligible",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
