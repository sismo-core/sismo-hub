
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
      "0xcE9e422388cb406851526E10CFd335FDe5c5F046": "1",
      "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": "1",
      "0xf73CceF113bd0F198562237987ac566F76fF28BF": "1",
    };

    return [
      {
        name: "nice666",
        timestamp: context.timestamp,
        description: "hold",
        specs: "zk badge owned by nice666",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
