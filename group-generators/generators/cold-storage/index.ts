
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
    
    const tokenProviderData0 = await tokenProvider.getERC1155Holders({
      contractAddress: "0xaB1303551dce526Ab1238Ed13eF067B3B19F3c94",
      network: "1"
    });

    return [
      {
        name: "cold-storage",
        timestamp: context.timestamp,
        description: "“Data Group of "COLD STORAGE" NFT",
        specs: "Cold Storage is a part of the SxT Community collection and has a limited quantity of 420 NFTs. The SxT Community collection consists of five hand-drawn images by @Omaraqilstudio exclusively for this project. Cold Storage is the third collectible in the collection.",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
