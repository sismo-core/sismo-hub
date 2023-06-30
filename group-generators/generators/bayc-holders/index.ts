
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
      contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
      chain: "eth-mainnet"
    });

    return [
      {
        name: "bayc-holders",
        timestamp: context.timestamp,
        description: "Data Group of Bored Ape Yacht Club holder addresses",
        specs: "Own at least one Bored Ape.",
        data: alchemyProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
