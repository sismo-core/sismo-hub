import { Group, Tags, ValueType } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { dataProviders } from "../../helpers/providers";
import { PoapChainTarget } from "../../helpers/providers/poap/types";

export default new GroupGenerator({
  name: "sismo-diggers",
  generate: async (context: GeneratorContext): Promise<Group> => {
    // This group is constituted by all the users who have a sismo poap
    // of the following event:

    const poapProvider = new dataProviders.PoapSubgraphProvider({
      targetedChain: PoapChainTarget.XDai,
    });

    const zikiPoapOwners = await poapProvider.queryEventsTokenOwners({
      eventIds: [
        37527 /* Ziki Testers */, 39515 /* Ziki Artists */,
        39651 /* Ziki Community Managers  */, 39654 /* Ziki Data Analysts */,
        39655 /* Ziki copywriters */, 39657 /* Ziki cryptographers */,
        39660 /* Ziki Data creators */,
      ],
    });

    return new Group({
      generationDate: new Date(context.timestamp),
      data: zikiPoapOwners,
      valueType: ValueType.Score,
      tags: [Tags.POAP, Tags.User],
    });
  },
  generationFrequency: GenerationFrequency.Daily,
});
