
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
      "0x6C0Fb2ce8A5Cc9eC6050483b2B2DCF30CD98D01a": "1",
    };

    return [
      {
        name: "empiredao-2023-1-day-desk-pass",
        timestamp: context.timestamp,
        description: "Purchase a 2023 individual 1 day desk pass for EmpireDAO",
        specs: "Purchase a 2023 individual 1 day desk pass for EmpireDAO for 0.05ETH",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
