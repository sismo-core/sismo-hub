
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
      "0x7f7dc3631a1413f8609114cc66c6afdbe24c7e33": "1",
    };

    return [
      {
        name: "regenpunks",
        timestamp: context.timestamp,
        description: "Data Group of humans that act with a deep green attitude towards regeneration",
        specs: "Proof of Physical Work by attestion of Regen Punks",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
