
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0xa1e89b3e483ceec616ab6fb9684e7193518ec124": "15",
    };

    return [
      {
        name: "sporty-achievers",
        timestamp: context.timestamp,
        description: "ETH Global Paris Hackathon Sporty Achievers Athletes",
        specs: "EthGlobal Paris Hackathon Sporty Achievers Lis of Athletes with a total of competitions.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
