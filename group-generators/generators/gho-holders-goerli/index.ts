
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
    
    const ankrProviderData0 = await ankrProvider.getTokenHolders({
      network: "eth_goerli",
      address: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211"
    });

    return [
      {
        name: "gho-holders-goerli",
        timestamp: context.timestamp,
        description: "Data Group of addresses holding GHO tokens on Ethereum Goerli",
        specs: "Holding Aave's GHO token on the  Ethereum Goerli  testnet (GhoToken	0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211), as provided by Ankr.
GHO is a decentralized multi-collateral stablecoin that is fully backed, transparent and native to the Aave Protocol.",
        data: ankrProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
