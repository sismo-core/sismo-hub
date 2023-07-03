
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
      "dhadrien.sismo.eth": "5000",
      "leosayous21.sismo.eth": "4500",
      "zkentin.eth": "6000",
    };

    return [
      {
        name: "demo-group-aci-delegators",
        timestamp: context.timestamp,
        description: "Demo Data Group of ACI delegators",
        specs: "Demo Data Group of ACI delegators, ONLY FOR DEMO PURPOSE.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
