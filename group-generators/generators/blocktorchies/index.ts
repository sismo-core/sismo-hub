
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
      "0x50C4410d4cAB04b14cCeDDB66d7f1997BD26eD67": "1",
      "0xb256349E861b5f942E3D9e675CFda632758c798a": "1",
      "0x8C779Fa4A89Bb3FF973C28f1b58E54Fb63e880D2": "1",
      "0x635Ce78b6B8CCCa3B41EAe2d05090CDe1fF7587d": "1",
      "0x52FeA963038aed97Fb79f75F68820f388c34C078": "1",
      "0x62F6f27EB57035B0e2C7a48a61Ed0Ad4C13BC330": "1",
      "0x3d537b27BA8a1Dc828aF7448706258678C312cD8": "1",
      "0xA627a8A6Da3b9958e9a44b8d81d3F6Aa1E8fFeC5": "1",
      "0xcFBCcd9b9B93302d46286F7629e4c748c5Df2d57": "1",
      "0x410810F675C166e456D3Ab141204423cBd045dd8": "1",
      "0xe1756C903E8657dC15D7faF189896DbcFdf8dCc7": "1",
      "0xa8E455f54A3d1B7D71E6D7d666A8B28178153987": "1",
      "0x017Db5878e081F9856C982D55904321472F0EE68": "1",
      "0x6be0375781c1cA8f8EF45226a1E0697e614C3C8b": "1",
      "0x048F91914cC450dced021AE26385A31A00cBdC7e": "1",
      "0x6f4D959A1F8f606A802b46D965AA1aF665d6C2eE": "1",
      "0x1b5E26E3c3cfd92D484da8131068b4e17e20547B": "1",
      "0x3b04cA022cf0389DAd06B6A7E34a506b5E992494": "1",
      "0x7d47862F7b2F0542871D0eeb28B76d1E0a847140": "1",
      "0x7F3eB2A108B002623fDA3844Dc400087AE862CB9": "1",
      "vitalik.eth": "1",
    };

    return [
      {
        name: "blocktorchies",
        timestamp: context.timestamp,
        description: "blocktorchies",
        specs: "plz b0ss",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
