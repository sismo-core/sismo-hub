
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
      "0x960aEed0b58991061D2527D3Dd414688E5958d5e": "1",
      "0x155250d3465Fc910a910b7C67d20C4Dd25fcb728": "1",
    };

    return [
      {
        name: "anonymous-feedback",
        timestamp: context.timestamp,
        description: "Gave anonymous feedback of their onboarding experience.",
        specs: "Gave anonymous feedback of their onboarding experience.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
