
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
      "twitter:samirpekaz": "1",
      "twitter:officiallybato": "1",
    };

    return [
      {
        name: "balkaneros-in-antler",
        timestamp: context.timestamp,
        description: "You are from the Balkans and have been in Antler VC programme.",
        specs: "You are from the Balkans and have been selected byAntler VC program in the past.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
