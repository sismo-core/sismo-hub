
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
      "0xBD373719f8625CBb89e96274d2339b8ddDee3D02": "1",
    };
    
    const jsonListData1 = {
      "0x18472801Ed01f69906665883B6b33739Ec04Db70": "1",
    };
    
    const jsonListData2 = {
      "0xcb09eE540454529Ee4fc2FBB74182D2c06447068": "1",
    };
    
    const jsonListData3 = {
      "0x2b7c090558E57fdA174CD70d1c51E654165CD16C": "1",
    };
    
    const jsonListData4 = {
      "0xB95698ABBF01C4e9e590A87fc4112ACe10650C01": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      jsonListData1,
      jsonListData2,
      jsonListData3,
      jsonListData4 
    ]);

    return [
      {
        name: "zkpay-finance-azf7",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
