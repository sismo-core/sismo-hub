
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
      "0xBF861d09615543c419c749Ea8cBEB720E3B3E3ad": "1",
    };

    return [
      {
        name: "alphainsiders",
        timestamp: context.timestamp,
        description: "Hold 0500AM NFT or Users With Degen or Angel Membership in Discord ",
        specs: "You can get a membership at https://whop.com/alphainsiders/",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
