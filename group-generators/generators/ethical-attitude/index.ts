
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
      "twitter:bengoertzel": "1",
      "twitter:apolynya": "1",
      "twitter:ClementineDomi6": "1",
      "twitter:FCazals": "1",
      "twitter:nono2357": "1",
      "twitter:BrianRoemmele": "1",
      "twitter:Marc__Vlad": "1",
      "twitter:burritodealer": "1",
      "twitter:DrNickA": "1",
      "twitter:privacyguardia": "1",    
    };

    return [
      {
        name: "ethical-attitude",
        timestamp: context.timestamp,
        description: "People that can take ethical decision on AI, Data management and Privacy topics.",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
