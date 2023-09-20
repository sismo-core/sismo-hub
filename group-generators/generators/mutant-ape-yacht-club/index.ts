
import { dataProviders } from "@group-generators/helpers/data-providers";
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
  
    const tokenProvider = new dataProviders.TokenProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
      network: "mainnet"
    });

    return [
      {
        name: "mutant-ape-yacht-club",
        timestamp: context.timestamp,
        description: "Data group of all holder of Mutant Ape Yacht Club NFT",
        specs: "Contains all Mutant Ape Yacht Club NFT holders on mainnet https://opensea.io/collection/mutant-ape-yacht-club, contract address 0x60E4d786628Fea6478F785A6d7e704777c86a7c6 . Value for each group member is the number of NFT owned",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
