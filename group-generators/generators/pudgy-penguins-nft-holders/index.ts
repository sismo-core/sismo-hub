
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
      contractAddress: "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
      network: "mainnet"
    });

    return [
      {
        name: "pudgy-penguins-nft-holders",
        timestamp: context.timestamp,
        description: "Data Group of holders of the Pudgy Penguins NFT",
        specs: "Data Group of holders of the Pudgy Penguins NFT. Value for each wallet is the number of tokens held.",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
