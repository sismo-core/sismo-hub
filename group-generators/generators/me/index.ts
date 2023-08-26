
import { dataOperators } from "@group-generators/helpers/data-operators";
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
      "pavlovdog.eth": "2",
    };
    
    const jsonListData1 = {
      "0x203E894fcd52f8841aB1356a3a4C413CA3E7e5B9": "1",
    };
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "me",
        timestamp: context.timestamp,
        description: "Me",
        specs: "No spec",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
