
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
      contractAddress: "0x2927fdB4e9D52734AAAD01B146FfcfEbf2873776",
      network: "137"
    });

    return [
      {
        name: "timeswap-pepe-astronaut",
        timestamp: context.timestamp,
        description: "Data Group of "Timeswap x Galaxy"",
        specs: "Exclusive Timeswap NFT as part of the Timeswap Pepe collection",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
