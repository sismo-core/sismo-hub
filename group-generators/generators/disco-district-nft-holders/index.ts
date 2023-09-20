
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
      contractAddress: "0x728f6e35C3ECE2fD121A0cEB54AeB71774316c2E",
      network: "mainnet"
    });

    return [
      {
        name: "disco-district-nft-holders",
        timestamp: context.timestamp,
        description: "Data group of holders of a Disco District NFT on Ethereum Mainnet",
        specs: "Hold a Disco District NFT on Ethereum Mainnet",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
