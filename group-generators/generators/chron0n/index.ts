
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
      // "twitter:maximincredible": "1", does not resolve from twitter API (account doesn't exist)
      "twitter:daiteskorosti": "1",
    };

    return [
      {
        name: "chron0n",
        timestamp: context.timestamp,
        description: "be verified on CHRON0n.finance, donated to CHRON0n.finance",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
