
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
      "0x898d0DBd5850e086E6C09D2c83A26Bb5F1ff8C33": "1",
      "0x62C43323447899acb61C18181e34168903E033Bf": "1",
      "0x72D7968514E5e6659CeBB5CABa7E02CFf8eda389": "1",
      "0x9B855D0Edb3111891a6A0059273904232c74815D": "1",
    };

    return [
      {
        name: "is-payment-channel-recepient",
        timestamp: context.timestamp,
        description: "Data group of Zook Payment Channel recepients",
        specs: "Data group of ERC1155 NFT Holders which is minted by the sender while creating a new payment channel to the recepient",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
