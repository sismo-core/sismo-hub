
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
      "0x9d0ddF73322Ece2BbdD79C47fb308538e981a7f3": "1",
    };

    return [
      {
        name: "opengrail-early-frens-dao",
        timestamp: context.timestamp,
        description: "OpenGrail ZK Badges for Juicebox community",
        specs: "Claim one free veNFT on https://opengrail.io and get special role in OG Discord server ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
