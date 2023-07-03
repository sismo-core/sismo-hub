
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
      "github:alinobrasil": "1",
      "github:AmazingA1": "1",
      "github:erwinqxy": "1",
      "github:DylanLiTR": "1",
      "github:NamdarS": "1",
    };

    return [
      {
        name: "team-v-lancer",
        timestamp: context.timestamp,
        description: "EthWaterloo Team Formation - Team V-Lancer",
        specs: "EthWaterloo Core Team - Team V-Lancer ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
