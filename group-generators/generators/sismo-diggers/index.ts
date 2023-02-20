import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
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
        37527 /* Ziki Testers */, 39515 /* Ziki Artists */,
        39651 /* Ziki Community Managers  */, 39654 /* Ziki Data Analysts */,
        39655 /* Ziki copywriters */, 39657 /* Ziki cryptographers */,
        39660 /* Ziki Data creators */, 54045 /* Ziki Run */,
        66267 /* Ziki Contributor Poap */,
      ],
    });

    return [
      {
        name: "sismo-diggers",
        timestamp: context.timestamp,
        description: "Sismo Diggers",
        specs: "",
        data: zikiPoapOwners,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User],
      },
    ];
  },
};

export default generator;
