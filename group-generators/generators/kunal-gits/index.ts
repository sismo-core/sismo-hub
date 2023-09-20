
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
      "github:KunalT6569": "1",
      "github:Kunal951": "1",
    };
    
    const jsonListData1 = {
      "github:KunalT6569": "1",
      "github:kunal951": "1",
    };
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "kunal-gits",
        timestamp: context.timestamp,
        description: "test group",
        specs: "test group",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
