
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
  
    const ankrProvider = new dataProviders.AnkrProvider();
    
    const ankrProviderData0 = await ankrProvider.getNftHolders({
      network: "eth",
      address: "0xA32Ba4034F9AF9d558665c6a0C9ED9c1472f0752"
    });

    return [
      {
        name: "rekt-news-hh-nft-holders",
        timestamp: context.timestamp,
        description: "Data Groups of holders of Rekt news - hacks & hopium NFT.",
        specs: "Data Groups of holders of Rekt news - hacks & hopium NFT on Mainnet.",
        data: ankrProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
