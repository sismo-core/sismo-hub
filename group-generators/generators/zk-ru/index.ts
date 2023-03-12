
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
      "0xC858c8592DC56069a01DD3C0A8AD49204dFc285b": "1",
    };

    return [
      {
        name: "zk-ru",
        timestamp: context.timestamp,
        description: "donate to 0xC858c8592DC56069a01DD3C0A8AD49204dFc285b",
        specs: "100500",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
