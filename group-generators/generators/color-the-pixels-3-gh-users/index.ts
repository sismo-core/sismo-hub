
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
      "github:AllArgsConstructor": "1",
      "github:hapsad": "1",
    };

    return [
      {
        name: "color-the-pixels-3-gh-users",
        timestamp: context.timestamp,
        description: "Color the pixels - 3 github users",
        specs: "Color the pixels - 3 github users",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
