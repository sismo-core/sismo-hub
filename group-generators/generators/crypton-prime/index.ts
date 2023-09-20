
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
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const tokenProvider = new dataProviders.TokenProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0xc272Dcd7A69A77BC7890Be60d1804372e7409053"
    });
    
    const tokenProviderData1 = await tokenProvider.getERC721Holders({
      contractAddress: "0xff5125028a076AC92Ca8D8A95d84D71fD4786E3c"
    });
    
    const tokenProviderData2 = await tokenProvider.getERC721Holders({
      contractAddress: "0x20a07cDC396aD68d0C2dC59F4DAba84aAd710163"
    });
    
    const tokenProviderData3 = await tokenProvider.getERC721Holders({
      contractAddress: "0x2889A3dFc0e1888709E6726C7528023a8100FD0E"
    });
    
    const tokenProviderData4 = await tokenProvider.getERC721Holders({
      contractAddress: "0x5585765cC2614bb1363a3001B93f36D3Ef099379"
    });
    
    const tokenProviderData5 = await tokenProvider.getERC721Holders({
      contractAddress: "0x0b5EFc7aEA8113698c840758E0b28522B4A42819"
    });
    
    const dataUnion = dataOperators.Union([
      tokenProviderData0,
      tokenProviderData1,
      tokenProviderData2,
      tokenProviderData3,
      tokenProviderData4,
      tokenProviderData5 
    ]);

    return [
      {
        name: "crypton-prime",
        timestamp: context.timestamp,
        description: "Data Group of users who participated in Crypton Prime PartyDAO",
        specs: "Participate in at least one Crypton Prime PartyDAO",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
