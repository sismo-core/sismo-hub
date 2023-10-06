
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
      "0xA36F8bAe7Cc83Ee4E870F913Cf55264EFA01a18B": "3",
    };

    return [
      {
        name: "truchottestgroup",
        timestamp: context.timestamp,
        description: "TruchotTestGroup",
        specs: "TruchotTestGroup",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
