
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
      contractAddress: "0xAB846Fb6C81370327e784Ae7CbB6d6a6af6Ff4BF",
      network: "mainnet"
    });

    return [
      {
        name: "pal-mainnet-holders",
        timestamp: context.timestamp,
        description: "Data Group of holders of the PAL ERC20 token on mainnet.",
        specs: "Data Group created with the Token Provider. The value for each address is the number of PAL tokens hold on mainnet.",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
