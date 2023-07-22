
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
      "0xcacafEde65602ed977124663E82Be0CD65cd19F7": "1",
      "0x02C006c07A58676C1249c45b951ee0ea7FF1B1AD": "1",
      "0x607Ec1a7F093801b40DaE21131dDAdB8ce991106": "1",
    };

    return [
      {
        name: "voters",
        timestamp: context.timestamp,
        description: "Data Group of the allowed voters (client members or above 18)",
        specs: "Data Group of the allowed voters",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
