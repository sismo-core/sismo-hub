import { Group, Tags, ValueType } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { dataProviders } from "../../helpers/providers";
import { PoapChainTarget } from "../../helpers/providers/poap/types";

export default new GroupGenerator({
  name: "ethereum-event-attenders",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const poapMultiChainProvider =
      new dataProviders.PoapCrossChainSubgraphProvider({
        targetedChains: [PoapChainTarget.XDai, PoapChainTarget.EthereumMainnet],
      });

    const ethereumEventAttendersOwner =
      await poapMultiChainProvider.queryEventsTokenOwners({
        eventIds: [
          3, 71, 15, 25, 39, 40, 41, 61, 4, 5, 11, 12, 7, 1, 9, 17, 6, 215, 217,
          23, 14, 26, 28, 27, 43, 60, 69, 84, 80, 94, 895, 123, 126, 12, 132,
          131, 179, 190, 189, 213, 357, 328, 350, 304, 303, 302, 305, 412, 510,
          511, 452, 553,
        ],
      });

    return new Group({
      generationDate: new Date(context.timestamp),
      data: ethereumEventAttendersOwner,
      valueType: ValueType.Score,
      tags: [Tags.POAP, Tags.User],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
