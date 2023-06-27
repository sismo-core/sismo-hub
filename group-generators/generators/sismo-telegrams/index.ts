
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
      "telegram:Gabinhs": "1",
      "telegram:leo21_eth": "1",
      "telegram:charls_charls": "1",
      "telegram:dhadrien": "1",
      "telegram:bigq11": "1",
      "telegram:kugusha_0x": "1",
      "telegram:MartinGbz": "1",
      "telegram:f9s216": "1",
      "telegram:quentinf67": "1",
      "telegram:dimsome": "1",
      "telegram:baoufa": "1",
    };

    return [
      {
        name: "sismo-telegrams",
        timestamp: context.timestamp,
        description: "Sismo telegram team member",
        specs: "List of Sismo telegram team member",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
