
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
      "0xa1b073d5503a27DFBA337cFdb8458b71B3359c74": "1",
      "0x6F8Be6B46314b51C2d88F5E839dA1d5892C9cfF5": "2",
    };

    return [
      {
        name: "dev-accounts",
        timestamp: context.timestamp,
        description: "ETH Online",
        specs: "none",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
