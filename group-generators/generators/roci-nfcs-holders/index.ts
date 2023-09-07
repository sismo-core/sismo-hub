
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
  
    const alchemyProvider = new dataProviders.AlchemyProvider();
    
    const alchemyProviderData0 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0x839a06a50A087fe3b842DF1877Ef83A443E37FbE",
      chain: "polygon-mainnet"
    });

    return [
      {
        name: "roci-nfcs-holders",
        timestamp: context.timestamp,
        description: "Data Group of NFCS holders on Polygon (https://roci.fi/nfcs)",
        specs: "Data Group of minters of RociFi NFCS token holders, non-fungible credit score",
        data: alchemyProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
