
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
      contractAddress: "0x758B4684BE769E92eeFeA93f60DDA0181eA303Ec",
    });

    return [
      {
        name: "first-1000-phonon-mainnet-holders",
        timestamp: context.timestamp,
        description: "Hold a Phonon Token on ETH Mainnet",
        specs: "ZK Badge owned by the first 1000 ETH Mainnet Holders ",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
