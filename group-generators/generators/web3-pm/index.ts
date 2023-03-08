
import { dataOperators } from "@group-generators/data-operators";
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
      "0xd9BB2516fb08b3cC731B4Fb8Fadd520d21B22Fb7": "1",
      "0x261d6B800CBF0cf3F0df6a79ae4C62a70c3b42d1": "1",
      "twitter:anna_makota": "1",
    };
    
    const jsonListData1 = {
      "0xa8eba44d6f67f87ad85fa3cd0784bdf9cf2b7b13": "1",
    };
    
    const jsonListData2 = {
      "0xA397F63aa9db90B58fF08D9FD3092Cb5c176f51F": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      jsonListData1,
      jsonListData2 
    ]);

    return [
      {
        name: "web3-pm",
        timestamp: context.timestamp,
        description: "hold Borderless Berlin POAP, EthGlobal POAP",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
