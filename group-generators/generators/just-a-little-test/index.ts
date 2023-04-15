
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
      "0x768D170EE896eb95714AB43aFCaC08F970607361": "1",
    };
    
    const jsonListData1 = {
      "0x0BB5ce31218Cf974AeD7Cf34FDdf321f9aDa0F8c": "1",
    };
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "just-a-little-test",
        timestamp: context.timestamp,
        description: "Testing, nothing more",
        specs: "Just to test factory sismo, do not try to use it, you won't be able to",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
