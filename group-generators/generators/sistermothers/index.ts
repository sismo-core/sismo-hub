
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
      "0x38378e4150d29B916C72A835bF3450b8BeA2C0c0": "1",
      "0xf7B8413e38De558B5b8dC0090f124857B8FAa5d7": "1",
      "0x20E7D6E39D24944568607e89FC164dCb3A03D7EB": "1",
      "0xF4ba41659654A95307F47a6Aba6c7Bf238fD4cdB": "1",
    };

    return [
      {
        name: "sistermothers",
        timestamp: context.timestamp,
        description: "Data Group of SisterMothers",
        specs: "Just some sisters and mothers",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
