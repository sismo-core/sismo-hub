
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
      "0xD48625B259706F1bCDC7c05006E0f006C902AE59": "1",
      "0x22E13FD3116557cb9fB7901f61027Dfd50dA391a": "1",
      "0x18472801Ed01f69906665883B6b33739Ec04Db70": "1",
      "0x2b7c090558E57fdA174CD70d1c51E654165CD16C": "1",
      "0xB95698ABBF01C4e9e590A87fc4112ACe10650C01": "1",
    };

    return [
      {
        name: "mannyradu",
        timestamp: context.timestamp,
        description: "follow",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
