
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0x7653a76c7FE1EeEc1746b86C5d92c3e4480C863A": "1",
      "0x3AB2239D340013E35843E0ef02FA322b0e69e1C8": "1",
    };

    return [
      {
        name: "blockchainchaos",
        timestamp: context.timestamp,
        description: "BlockchainChaos Community Member",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
