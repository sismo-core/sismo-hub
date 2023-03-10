
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "twitter:PrimeRandom": "1",
      "twitter:z2m2020": "1",
    };
    
    const jsonListData1 = {
      "0x1a5954C782BE7cd4e8e94e51fe0a9F910d725355": "1",
      "0x61077fb77cfd9728cF781D11442cbB60B9383812": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "testbadgeonpolygon",
        timestamp: context.timestamp,
        description: "test-mint-badge-with-twitter-mixed-eth-account",
        specs: "testing",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
