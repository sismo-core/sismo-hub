
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
    
    const tokenProviderData0 = await ankrProvider.getTokenHolders({
      network: "eth",
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
    });

    return [
      {
        name: "connectfast",
        timestamp: context.timestamp,
        description: "Datagroup of MATIC holder before now",
        specs: "Hold a MATIC token before Tuesday 4th July 15:11",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
