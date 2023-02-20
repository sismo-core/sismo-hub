
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
      "0x9fa698E6d81c34A67f4b8Dba40F62C3f5Df88190": "1",
      "0x7927f89670F942169476b006966dd6ECCdc7425c": "1",
      "0x631563241c1B8988ba3922255B2fA3B5C231dB8b": "1",
    };

    return [
      {
        name: "skynetwork",
        timestamp: context.timestamp,
        description: "Subscribers https://link3.to/skynetwork",
        specs: "Subscribers https://link3.to/skynetwork",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
