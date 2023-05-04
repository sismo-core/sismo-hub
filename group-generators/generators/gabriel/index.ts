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
      chain: "eth-mainnet",
      contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    });

    return [
      {
        name: "gabriel",
        timestamp: context.timestamp,
        description: "Awesome",
        specs: "HOLLLLLL",
        data: alchemyProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
