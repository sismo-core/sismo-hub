import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const snapshotProvider = new dataProviders.SnapshotProvider();

    const input = {
      space: "sismo.eth",
    };

    // const input2 = {
    //   proposal:
    //     "0x6b0c32f57d7f4943811ccdcf00246e3cb5a4e3faeffd0f067ce25e8ef8b23ffa",
    // };

    const snapshot2 = await snapshotProvider.querySpaceFollowers(input);
    // const snapshot2 = await snapshotProvider.queryProposalVoters(input2);

    console.log(snapshot2);

    return [
      {
        name: "example-snapshot",
        timestamp: context.timestamp,
        description: "get all snapshot queries",
        specs: "",
        data: snapshot2,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};
export default generator;
