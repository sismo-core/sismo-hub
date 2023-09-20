
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
  
    const alchemyProvider = new dataProviders.AlchemyProvider();
    
    const alchemyProviderData0 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
      chain: "polygon-mainnet"
    });

    return [
      {
        name: "lens-profile-holders",
        timestamp: context.timestamp,
        description: "Data Group of all Lens Profile owners",
        specs: "Created by the Token Data Provider. Contains all the addresses that own a Lens Profile. Value for each group member is the number of Profile held.",
        data: alchemyProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
