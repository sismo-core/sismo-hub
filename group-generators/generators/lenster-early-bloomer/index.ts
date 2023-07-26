import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();

    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: ["49299"],
    });

    return [
      {
        name: "lenster-early-bloomer",
        displayName: "Lenster Early Bloomers",
        timestamp: context.timestamp,
        description: "Data Group of all Lenster Earlly Bloomer POAP owners",
        specs: "Created by the POAP Data Provider. Contains owners of the POAP #49299.",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
