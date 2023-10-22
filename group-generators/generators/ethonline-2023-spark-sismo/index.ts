
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
      "twitter:dhadrien_": "30",
      "twitter:leo21_eth": "15",
      "twitter:JoyMun777": "15",
      "twitter:asyncakash": "15",
      "twitter:sparkdotfi": "15",
    };

    return [
      {
        name: "ethonline-2023-spark-sismo",
        timestamp: context.timestamp,
        description: "Data group of eligible members for ETH Online 2023 demo",
        specs: "Will be shared during demo",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
