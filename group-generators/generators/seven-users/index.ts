
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
      "github:kunal951": "1",
    };

    return [
      {
        name: "seven-users",
        timestamp: context.timestamp,
        description: "7users",
        specs: "7users",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
