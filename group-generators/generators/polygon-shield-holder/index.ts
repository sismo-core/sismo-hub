
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
      contractAddress: "0x0eDF48310aDb2a17D25C27de4049873604b4eA7A",
      chain: "polygon-mumbai"
    });

    return [
      {
        name: "polygon-shield-holder",
        timestamp: context.timestamp,
        description: "Data Group for Users Holding the Polygon Shield",
        specs: "Data Group for Users Holding the Polygon Shield",
        data: alchemyProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
