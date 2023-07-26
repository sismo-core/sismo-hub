import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    // This group is constituted by all the users who have a sismo poap
    // of the following event:

    const poapProvider = new dataProviders.PoapSubgraphProvider();

    const zikiPoapOwners = await poapProvider.queryEventsTokenOwners({
      eventIds: [
        53325 /* Sismo ETHCC */, 48976 /* Sismo PreMasquerade */, 48975 /* Sismo Masquerade  */,
      ],
    });

    return [
      {
        name: "sismo-events",
        displayName: "Sismo Events Attendees",
        timestamp: context.timestamp,
        description: "Data Group of all users who got a Sismo POAP during events",
        specs:
          "Created by POAP Provider. Contains all users who have a Sismo POAP of the following events: 53325 (Sismo ETHCC), 48976 (Sismo PreMasquerade), 48975 (Sismo Masquerade)",
        data: zikiPoapOwners,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User, Tags.Maintained],
      },
    ];
  },
};

export default generator;
