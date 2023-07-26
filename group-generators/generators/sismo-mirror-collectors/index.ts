import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const alchemyProvider = new dataProviders.AlchemyProvider();

    const alchemyProviderData0 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0x4De7E32fE8ced031D766EF7FeD26aF149586c084",
      chain: "opt-mainnet",
    });

    const alchemyProviderData1 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0x02a072314479485125018802a57B00AD99e5234a",
      chain: "opt-mainnet",
    });

    const dataUnion = dataOperators.Union([alchemyProviderData0, alchemyProviderData1]);

    return [
      {
        name: "sismo-mirror-collectors",
        timestamp: context.timestamp,
        description: "Data Group of Sismo Mirror blog posts collectors",
        specs:
          "Created by the Alchemy Data Provider. Contains the collectors of all Sismo mirror.xyz blog posts.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
