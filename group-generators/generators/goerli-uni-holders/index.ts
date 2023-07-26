
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
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      network: "eth_goerli"
    });

    return [
      {
        name: "goerli-uni-holders",
        timestamp: context.timestamp,
        description: "goerli Uni holders",
        specs: "wallets that hold UNI token on goerli",
        data: ankrProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
