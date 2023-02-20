
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
  
    const lensProvider = new dataProviders.LensProvider();
    
    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "spiritxp.lens"
    });

    return [
      {
        name: "cryptomarketblog",
        timestamp: context.timestamp,
        description: "Follow CryptoMarket.blog lens profile @spiritxp.lens",
        specs: "Follow  @spiritxp.lens on apps powered by Lens Protocol ",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
