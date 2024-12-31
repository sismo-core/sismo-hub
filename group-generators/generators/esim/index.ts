
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
      "0x6b24fD32c923965ba85bea3B066870c23e9361f2": "1",
      "0xee9382Bf729Ff377Da6CEEe428B3228AF5367A31": "1",
    };

    return [
      {
        name: "esim",
        timestamp: context.timestamp,
        description: "eSIM platform users",
        specs: "nothing",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
