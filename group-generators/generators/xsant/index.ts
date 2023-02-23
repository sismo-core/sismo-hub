
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
      "0x245c817bb7C5648cdadDC96CEe166173094391F6": "1",
      "0x5a27d268e830655e908a0a2c3b24f572695af5e8": "1",
      "0x87baB2d9B11ec3d8A85e91ce86A6f5951bf1c9a6": "1",
      "0xE6b11C657AFB94F152BFe7D38876E19B0C836A06": "1",
    };

    return [
      {
        name: "xsant",
        timestamp: context.timestamp,
        description: "Be part of XSanT crypto friends",
        specs: "Be part of XSanT crypto friends",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
