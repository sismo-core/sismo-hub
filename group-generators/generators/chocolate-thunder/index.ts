
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
  
    const tokenProvider = new dataProviders.TokenProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC20Holders({
      contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    });

    return [
      {
        name: "chocolate-thunder",
        timestamp: context.timestamp,
        description: "Data Group of Tether holders",
        specs: "Must hold Tether",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
