
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
    
    const ankrProviderData0 = await ankrProvider.getTokenHolders({
      address: "0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898",
      network: "eth"
    });

    return [
      {
        name: "cake-holders-on-eth",
        timestamp: context.timestamp,
        description: "CAKE Holder on ETH",
        specs: "Group of Wallet of CAKE Holders on ETH mainnet",
        data: ankrProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
