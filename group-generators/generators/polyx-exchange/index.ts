
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
      "0x9377B9F84194a0035aA914d122c80868d3D7d8E1": "1",
      "0xd97bB17ad711a31A5D022689fA123aDB60Bf8Ef5": "1",
      "0x12d750532b897bb02848026EB53538DCdb2F5809": "1",
      "0x0EdAA850523501a62C415Eee1342aC6C18F622cb": "1",
      "0x8F171C49B57DdCAbA836bbaafD5fd1C8bD886FD8": "1",
    };

    return [
      {
        name: "polyx-exchange",
        timestamp: context.timestamp,
        description: "Be part of the PolyX Exchange core team.",
        specs: "Be a member of the PolyX Exchange core team.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
