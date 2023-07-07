
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
  
    const alchemyProvider = new dataProviders.AlchemyProvider();
    
    const alchemyProviderData0 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0x08d7c0242953446436f34b4c78fe9da38c73668d",
      chain: "eth-mainnet"
    });

    return [
      {
        name: "proof-pass-holders",
        timestamp: context.timestamp,
        description: "Data Group of Proof Pass NFT holder addresses",
        specs: "All addresses that hold a token from 0x08d7c0242953446436f34b4c78fe9da38c73668d on Eth-mainnet, updated daily.",
        data: alchemyProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
