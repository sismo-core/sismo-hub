import { dataProviders } from "@group-generators/helpers/providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    // This group is constituted by all the users who have a sismo poap
    // of the following event:

    const poapProvider = new dataProviders.PoapSubgraphProvider();

    const zikiPoapOwners = await poapProvider.queryEventsTokenOwners({
      eventIds: [
        53325 /* Sismo ETHCC */, 
        48976 /* Sismo PreMasquerade */,
        48975 /* Sismo Masquerade  */,
      ],
    });

    return [
      {
        name: "sismo-events",
        timestamp: context.timestamp,
        data: zikiPoapOwners,
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User],
      },
    ];
  },
};

export default generator;
