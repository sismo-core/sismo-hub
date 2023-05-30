
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
      "github:fernandezOli": "1",
      "github:bertux": "1",
      "github:julienbrg": "1",
    };

    return [
      {
        name: "w3hc-member",
        timestamp: context.timestamp,
        description: "Be a member of the Web3 Hackers Collective Github organization",
        specs: "Be a member of the Web3 Hackers Collective (W3HC) Github organization. https://github.com/w3hc",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
