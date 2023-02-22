
import { dataOperators } from "@group-generators/helpers/data-operators";
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
      "0xb69b4B59d8c2BDDaF8513465f14ff01d84f17b57": "1",
    };
    
    const jsonListData1 = {
      "nyanheroes.lens": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "best-cafe",
        timestamp: context.timestamp,
        description: "cafe",
        specs: "cafe không bạn ei",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
