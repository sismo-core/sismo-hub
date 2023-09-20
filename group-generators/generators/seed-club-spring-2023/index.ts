
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
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
  
    const tokenProvider = new dataProviders.TokenProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0x5ecb8946369e593fa5581f1a4b98ace506481fbf"
    });
    
    const tokenProviderData1 = await tokenProvider.getERC721Holders({
      contractAddress: "0x20e792f7526d00b1f3d140ad403d85693b945e53"
    });
    
    const tokenProviderData2 = await tokenProvider.getERC721Holders({
      contractAddress: "0x5a62903d0fc1f1b0ee63cfd2710b058685aed199"
    });
    
    const tokenProviderData3 = await tokenProvider.getERC721Holders({
      contractAddress: "0x75e216b5313477b17188637f54a1c1f93d235df7"
    });
    
    const tokenProviderData4 = await tokenProvider.getERC721Holders({
      contractAddress: "0x3ae67194036aa27b58ae5798a6fd6c72092eda3c"
    });
    
    const tokenProviderData5 = await tokenProvider.getERC721Holders({
      contractAddress: "0x7e4c3b7d4fb69ae4f5572360d3101ee8e450990f"
    });
    
    const tokenProviderData6 = await tokenProvider.getERC721Holders({
      contractAddress: "0xb5679a87cb9ac64017ab909540cdbc8f05624271"
    });
    
    const tokenProviderData7 = await tokenProvider.getERC721Holders({
      contractAddress: "0xa39fec269b82f07cb5ef7b75d6b4ef11005ad208"
    });
    
    const tokenProviderData8 = await tokenProvider.getERC721Holders({
      contractAddress: "0xe5c2C5242A25067ca58eA0543Ca36B8A84d79540"
    });
    
    const dataUnion = dataOperators.Union([
      tokenProviderData0,
      tokenProviderData1,
      tokenProviderData2,
      tokenProviderData3,
      tokenProviderData4,
      tokenProviderData5,
      tokenProviderData6,
      tokenProviderData7,
      tokenProviderData8 
    ]);

    return [
      {
        name: "seed-club-spring-2023",
        timestamp: context.timestamp,
        description: "Hold at least one Spring 2023 NFT",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
