import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();

    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: ["3532", "8507", "14048", "32225", "47553", "63182"],
    });

    return [
      {
        name: "early-raave-attendee",
        displayName: "Early rAAVE Attendees",
        timestamp: context.timestamp,
        description: "Data Group of all rAAVE attendee",
        specs:
          "Created by the POAP Data Provider. Contains owners of the following POAPs: • 3532 (Paris, July 2021) • 8507 (Lisbon, October 2021) • 14048 (Helsinki, December 2021) • 32225 (Amsterdam, April 2022) • 47553 (Paris, July 2022) • 63182 (Bogota, October 2022)",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
