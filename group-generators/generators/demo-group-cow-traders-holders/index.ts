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
    
    const jsonListData1 = {
      "leosayous21.sismo.eth": "3",
      "dhadrien.sismo.eth": "3",
      "zkentin.eth": "3",
      "dimsome.eth": "2",
      "martingbz.eth": "1",
    };
    
    return [
      {
        name: "demo-group-cow-traders-holders",
        timestamp: context.timestamp,
        description: "Demo Data Group of Cow traders and holders.",
        specs: "Demo Data Group of Cow traders and holders. ONLY FOR DEMO PURPOSE.",
        data: jsonListData1,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
