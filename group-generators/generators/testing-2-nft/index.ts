
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
      "0xC9Fd509E7969DE8Dbc1b5BfBdFc1418d90C27a3b": "1",
    };

    return [
      {
        name: "testing-2-nft",
        timestamp: context.timestamp,
        description: "testing 2 nft owner",
        specs: "testing 2 nft ownerasdfasdfasdf",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
