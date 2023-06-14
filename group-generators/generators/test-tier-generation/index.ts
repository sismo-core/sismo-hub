
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
      "apele.eth": "3",
      "telegram:pelealexandru": "9",
      "twitter:apele_eth": "5",
      "github:alexandrupele": "6",
    };

    return [
      {
        name: "test-tier-generation",
        timestamp: context.timestamp,
        description: "Test telegram and tier generation in prod",
        specs: "Test telegram and tier generation in prod",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
