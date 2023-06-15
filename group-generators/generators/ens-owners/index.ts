
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
  
    const tokenProvider = new dataProviders.TokenProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72"
    });

    return [
      {
        name: "ens-owners",
        timestamp: context.timestamp,
        description: "Data group of ENS owners",
        specs: "Hold an ENS domain",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
