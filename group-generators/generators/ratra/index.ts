
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
      "0x2b7c090558E57fdA174CD70d1c51E654165CD16C": "1",
      "0xB95698ABBF01C4e9e590A87fc4112ACe10650C01": "1",
      "0xA2eC09438278eb8c900A946D310408615F1ae7aB": "1",
      "0x22e13fd3116557cb9fb7901f61027dfd50da391a": "1",
    };

    return [
      {
        name: "ratra",
        timestamp: context.timestamp,
        description: "be part of ratra group.",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
