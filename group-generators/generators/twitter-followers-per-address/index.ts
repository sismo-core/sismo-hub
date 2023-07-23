
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
      "0x1f8255238DDDF0441Fb2dCc5377675122D4Ae484": "6000",
      "0x3A3E5b07cAe317a3718E76437Fb46B0c50235D68": "400",
      "0x429b0bD2c7Bd4cED529370f9f1e652fbdc3AA76D": "3000",
      "0xa96Bd3e47D7dEA707253798F361e0e10215A3FA4": "400000",
      "0xe8187b0899A1855d2BD38D722b23982ABa8b0B14": "15000",
      "0x99d2907C6cEB0339587De82783Ab7Bcf6248687e": "0",
      "0x09597bFbc5995821C845e36738688763780b13fD": "700000",
      "0x27Ab79D90748c8b5028f02c5C795FBDe0D0d189c": "4200000",
    };

    return [
      {
        name: "twitter-followers-per-address",
        timestamp: context.timestamp,
        description: "Twitter followers per ETH address",
        specs: "Twitter followers per ETH address (linked previously to twitter handle through twitter sign in on sismo).",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
