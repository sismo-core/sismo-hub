
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
      "0xd543422A54D1703616b453741Aa1eb654Adc1044": "1",
      "0x91dF70a6F9b2AE4C00B2accADeAb0Cd81fFFb90e": "1",
      "0x31f6C8FF68e515eC5417E37880F7b0Aea76d9d19": "1",
    };

    return [
      {
        name: "thought1vector",
        timestamp: context.timestamp,
        description: "Be part of the crypto community",
        specs: "Hol a Sismo contributor POAP",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
