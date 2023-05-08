
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
      contractAddress: "0x85BC2E8Aaad5dBc347db49Ea45D95486279eD918",
      chain: "polygon-mainnet"
    });

    return [
      {
        name: "cometh-spaceship-holders",
        timestamp: context.timestamp,
        description: "Data group of Gamers owning a Cometh Spaceship",
        specs: "Hold the Cometh Spaceship associated with the Cometh Battle game to be eligible for the badge.",
        data: alchemyProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
