
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
  
    const ankrProvider = new dataProviders.AnkrProvider();
    
    const ankrProviderData0 = await ankrProvider.getNftHolders({
      address: "0xbfdb5d8d1856b8617f1881fd718580256fa8cf35",
      network: "base"
    });

    return [
      {
        name: "farcaster-v3-nft-holders",
        timestamp: context.timestamp,
        description: "Holders of Farcaster V3 NFT on Base",
        specs: "This group consists of all the holders of the Farcaster V3 NFT issued by Dan Romero on Base",
        data: ankrProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
