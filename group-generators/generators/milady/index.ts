
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
      contractAddress: "0x5Af0D9827E0c53E4799BB226655A1de152A425a5"
    });

    return [
      {
        name: "milady",
        displayName: "Milady NFT Holders",
        timestamp: context.timestamp,
        description: "Data Group of all Milady NFT holders",
        specs: "Created by the Token Data Provider. Contains all Milady NFT holders. Value for each group member is the number of NFTs held.",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
