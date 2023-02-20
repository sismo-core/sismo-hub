
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
      "0x781F9157D2c1DD992921235185c521FfdD255591": "1",
      "0xE46AC8a58851487096f26F8CBFACD0Aa61734D0d": "1",
      "0x432011B93153b16c2Efc8f524B2348F69779c7Ac": "1",
      "0xcBb40dA782c3404aaFfa4E88531ABB99A13e02C8": "1",
      "0x03a30a9e91cb0b6130efd3da000c869a43f77c44": "1",
    };

    return [
      {
        name: "thub-contributor",
        timestamp: context.timestamp,
        description: "Submitted a protocol to THUB ",
        specs: "Users who have submitted a protocol that meets THUB quality standards",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
