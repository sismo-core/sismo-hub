
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
      "0x16951fDf53Cb2084b87C9EdF10C8dB93d18D00b9": "1",
    };
    
    const jsonListData1 = {
      "0x85882040fbafda6380fd309f28825d90d04f5f58": "1",
    };
    
    const jsonListData2 = {
      "0x293715a5120d1f98bd718775a6b246078f0014b0": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      jsonListData1,
      jsonListData2 
    ]);

    return [
      {
        name: "univ3rs",
        timestamp: context.timestamp,
        description: "Hold a Univ3rs Badge to be part of the project",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
