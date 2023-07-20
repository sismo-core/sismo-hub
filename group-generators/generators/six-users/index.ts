
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
      "github:zivori": "1",
      "twitter:oriziv": "1",
      "twitter:kobigurk": "1",
      "github:kobigurk": "1",
      "github:hapsad": "1",
      "github:AllArgsConstructor": "1",
    };

    return [
      {
        name: "six-users",
        timestamp: context.timestamp,
        description: "6 users coloring",
        specs: "6 users coloring",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
