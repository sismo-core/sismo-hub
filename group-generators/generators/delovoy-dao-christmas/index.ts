
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
      "sangvin.lens": "1",
      "ladyro.eth": "1",
      "Rusha.lens": "1",
      "twitter:VladManz": "1",
      "twitter:onedayoneround": "1",
      "makedonski.eth": "1",
      "twitter:TreefeedXavier": "1",
      "justhuman.eth": "1",
      "twitter:Russiansf": "1",
    };

    return [
      {
        name: "delovoy-dao-christmas",
        timestamp: context.timestamp,
        description: "Be part of Delovoy DAO",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
