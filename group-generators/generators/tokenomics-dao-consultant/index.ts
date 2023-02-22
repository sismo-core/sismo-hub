
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
      "0x03a30a9e91cb0b6130efd3da000c869a43f77c44": "1",
      "0xcBb40dA782c3404aaFfa4E88531ABB99A13e02C8": "1",
      "0x781F9157D2c1DD992921235185c521FfdD255591": "1",
      "0x7B83FE5fe364B32b97498371C00008705094cf84": "1",
      "0xD5034CE12cA22ADB739Ef29aD8d4c063a6b6818f": "1",
      "0xA0f9a2C7Df0d18fc84FC5c6C3b009e988645fb12": "1",
      "0x432011B93153b16c2Efc8f524B2348F69779c7Ac": "1",
    };

    return [
      {
        name: "tokenomics-dao-consultant",
        timestamp: context.timestamp,
        description: "Nominated by other consultants",
        specs: "Users who have passed the Tokenomics DAO nomination process",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
