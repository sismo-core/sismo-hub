
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
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const tokenProvider = new dataProviders.TokenProvider();
    const alchemyProvider = new dataProviders.AlchemyProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0x9d90669665607f08005cae4a7098143f554c59ef"
    });
    
    const alchemyProviderData1 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0x0eDF48310aDb2a17D25C27de4049873604b4eA7A",
      chain: "polygon-mumbai"
    });
    
    const alchemyProviderData2 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0x4ba1feec210f687e65eb19808d42f5bf66af329b",
      chain: "polygon-mumbai"
    });
    
    const dataUnion = dataOperators.Union([
      tokenProviderData0,
      alchemyProviderData1,
      alchemyProviderData2 
    ]);

    return [
      {
        name: "shield-airdrop",
        timestamp: context.timestamp,
        description: "Holder of the Coinbase Shield NFT, Holder of the Polygon Shield NFT, and Holder of the ApeCoin NFT",
        specs: "Holder of the Coinbase Shield NFT, Holder of the Polygon Shield NFT, and Holder of the ApeCoin NFT",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
