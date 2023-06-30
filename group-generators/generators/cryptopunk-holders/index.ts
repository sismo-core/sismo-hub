
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
  
    const alchemyProvider = new dataProviders.AlchemyProvider();
    
    const alchemyProviderData0 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
      chain: "eth-mainnet"
    });

    return [
      {
        name: "cryptopunk-holders",
        timestamp: context.timestamp,
        description: "Data Group of all CryptoPunks holder addresses",
        specs: "Own at least 1 CryptoPunk.",
        data: alchemyProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
