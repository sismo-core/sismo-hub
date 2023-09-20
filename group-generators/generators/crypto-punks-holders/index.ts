
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
  
    const tokenProvider = new dataProviders.TokenProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC20Holders({
      contractAddress: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
      network: "mainnet",
    });

    return [
      {
        name: "crypto-punks-holders",
        timestamp: context.timestamp,
        description: "Data Group of all crypto punks holders",
        specs: "Created by the Token Provider. Contains of all crypto punks holders. Value for each group member is the number of Token held.",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
