
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
      "wakiyamap.eth": "1",
      "0x49247A282C650f1C090f422eC8E0EABd317fA405": "1",
      "0xF9c79b51beCcdc3fbb70c5F5FBC1F4E4d07f5A49": "1",
      "0x9dE23dD829B77e99Eac35b4063485f0634d84165": "1",
    };

    return [
      {
        name: "hashhub",
        timestamp: context.timestamp,
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
