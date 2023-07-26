
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
  
    const ankrProvider = new dataProviders.AnkrProvider();
    
    const ankrProviderData0 = await ankrProvider.getNftHolders({
      address: "0xf4910c763ed4e47a585e2d34baa9a4b611ae448c",
      network: "5"
    });

    return [
      {
        name: "opensea-nft-minter",
        timestamp: context.timestamp,
        description: "Opensea NFT Holder",
        specs: "Value of each wallet is the number of minted tokens",
        data: ankrProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
