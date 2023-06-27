
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
      "0x7D8923871495C0187DC19ad24875391a18b22d1a": "1",
      "0x2b9b9846d7298e0272c61669a54f0e602aba6290": "1",
      "0xb01ee322c4f028b8a6bfcd2a5d48107dc5bc99ec": "1",
      "0x938f169352008d35e065F153be53b3D3C07Bcd90": "1",
    };

    return [
      {
        name: "license-owners",
        timestamp: context.timestamp,
        description: "Owners of license",
        specs: "Lorem Ipsum",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
