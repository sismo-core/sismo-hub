
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
      contractAddress: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
    });

    return [
      {
        name: "apecoin-holders-by-chimeradefi",
        timestamp: context.timestamp,
        description: "Holders of Apecoin at EthLisbon",
        specs: "Holds >0 Apecoin https://etherscan.io/token/0x4d224452801aced8b2f0aebe155379bb5d594381. Created at ETHLisbon on May 13/2023 by @chimeraDefi",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
