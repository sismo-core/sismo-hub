
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
      "0x49B828C60dF0cB4FE8b337AEfb62681365a5B966": "1",
    };

    return [
      {
        name: "empiredao-2023-5-day-desk-pass",
        timestamp: context.timestamp,
        description: "Purchase a 2023 individual 5 day desk pass for EmpireDAO",
        specs: "Purchase a 2023 individual 5 day desk pass for EmpireDAO for 0.2 ETH",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
