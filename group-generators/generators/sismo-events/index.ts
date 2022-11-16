import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    // This group is constituted by all the users who have a sismo poap
    // of the following event:

    const poapProvider = new dataProviders.PoapSubgraphBaseProvider();

    const zikiPoapOwners = await poapProvider.queryEventsTokenOwners({
      eventIds: [
        53325 /* Sismo ETHCC */, 48976 /* Sismo PreMasquerade */,
        48975 /* Sismo Masquerade  */,
      ],
    });

    return [
      {
        name: "sismo-events",
        timestamp: context.timestamp,
        data: zikiPoapOwners,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User],
      },
    ];
  },
};

export default generator;
