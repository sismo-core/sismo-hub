
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
      "0xeE2BB8598725445B532BDb14F522A99E04e84B38": "1",
    };
    
    const jsonListData1 = {
      "0x33899bF6c0F54607a9f8CeAd3D8c80443a7a1f59": "1",
    };
    
    const jsonListData2 = {
      "0x457A8E472661fB5624Cf7f84e8dB1acf7C37D49E": "1",
    };
    
    const jsonListData3 = {
      "0xBe8684fDB44769469411cAAC5EB6D93F6C1869E4": "1",
    };
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      jsonListData1,
      jsonListData2,
      jsonListData3 
    ]);

    return [
      {
        name: "dz123",
        timestamp: context.timestamp,
        description: "détenir un .sismo ou .eth",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
