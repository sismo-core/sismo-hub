
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
      "0xD0C7D352c78FE4A5C8E93A4782B353c6d87E9c8B": "1",
    };
    
    const jsonListData1 = {
      "0xD0C7D352c78FE4A5C8E93A4782B353c6d87E9c8B": "1",
    };
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "worldcoinproofofhumanhood-eth",
        timestamp: context.timestamp,
        description: "Worldcoinproofofhumanhood",
        specs: "WorldCoinProofofHumanhood",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
