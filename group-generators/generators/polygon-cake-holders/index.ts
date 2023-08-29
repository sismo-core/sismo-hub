
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
      contractAddress: "0x805262B407177c3a4AA088088c571164F645c5D0",
      network: "polygon"
    });

    return [
      {
        name: "polygon-cake-holders",
        timestamp: context.timestamp,
        description: "Polygon Cake Holders",
        specs: "Holders of CAKE token from pankcakeSwap on polygon",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
