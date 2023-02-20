
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
      "0x02dCE608f759A97eCBcd6f5b148137E4ee7A20e2": "1",
    };
    
    const jsonListData1 = {
      "0x02dCE608f759A97eCBcd6f5b148137E4ee7A20e2": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "banny",
        timestamp: context.timestamp,
        description: "By ETH",
        specs: "ETH",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
