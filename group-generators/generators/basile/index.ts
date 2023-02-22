
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
      "0x1C013E4A46d0A5DA0ed8e0712bDC5E734E2b9e91": "1",
      "0x811728F6cf140b13713D23809Ae0405b78689953": "1",
    };

    return [
      {
        name: "basile",
        timestamp: context.timestamp,
        description: "Early ZK Badges",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
