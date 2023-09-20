
import { dataProviders } from "@group-generators/helpers/data-providers";
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
  
    const tokenProvider = new dataProviders.TokenProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0x8761b55aF5A703d5855F1865dB8fE4DD18E94c53"
    });

    return [
      {
        name: "hodl-synthetic-nouns",
        timestamp: context.timestamp,
        description: "Data group of users holding Nouns NFT in Ethereum Mainnet updated weekly.",
        specs: "Hold a Nouns NFT and unlock a special song in our QSound Music Platform.",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
