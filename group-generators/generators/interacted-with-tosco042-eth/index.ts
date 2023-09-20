
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0x76341A8c6aBFbeF6fC4488a42a45562Eb25E7B2F": "1",
      "0x9Accb17A4ADFDae33495848355c4b8b0Fa670862": "1",
    };

    return [
      {
        name: "interacted-with-tosco042-eth",
        timestamp: context.timestamp,
        description: "Data group of wallets that interacted with tosco042.eth",
        specs: "The mentioned data group comprises the wallets that have engaged in some form of interaction, such as transferring funds, executing smart contracts, or participating in decentralized applications, with the Ethereum address 'tosco042.eth.' This data could potentially be analyzed or studied for various purposes, such as understanding the network's activity, tracking transactions, or conducting research on Ethereum-related behaviors.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
