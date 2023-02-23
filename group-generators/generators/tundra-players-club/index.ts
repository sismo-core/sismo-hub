
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
      "0xceF35Ca88dEC8d83Ca6CaE75DD429D7d08c11548": "1",
      "0xcb7a1F50e251c67e7ee1FDA46784cAFC8b08c518": "1",
    };

    return [
      {
        name: "tundra-players-club",
        timestamp: context.timestamp,
        description: "Member of TPC",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
