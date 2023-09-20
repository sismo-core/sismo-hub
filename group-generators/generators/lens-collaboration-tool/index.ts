
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
      "github:MatteoMer": "1",
    };

    return [
      {
        name: "lens-collaboration-tool",
        timestamp: context.timestamp,
        description: "Group for Hackathon at ETHGlobal Paris",
        specs: "This Group consists of all members allowed to post on the lens collaboration tool built at ETHGlobal Paris",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
