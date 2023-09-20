
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
      "github:xmazella": "1",
      "github:doliG": "1",
    };

    return [
      {
        name: "lens-collaboration-able-post",
        timestamp: context.timestamp,
        description: "Lens collabaration tool eth global paris, able to post",
        specs: "Lens collabaration tool eth global paris, able to post",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
