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

    // const input = {
    //   space: "sismo.eth",
    //   date: "2023-03-01",
    // };

    // const snapshot = await snapshotProvider.querySpaceFollowers({
    //   space: input.space,
    //   date: input.date,
    // });

    // const snapshot = await snapshotProvider.querySpaceFollowers({
    //   space: input.space,
    // });

    // const input2 = {
    //   proposal:
    //     "0x6b0c32f57d7f4943811ccdcf00246e3cb5a4e3faeffd0f067ce25e8ef8b23ffa",
    // };
    // const snapshot2 = await snapshotProvider.queryProposalVoters(input2);

    // const input3 = {
    //   space: "sismo.eth",
    //   abovex: 2,
    //   state: "successful",
    //   forcedValue: 10,
    // };
    // const snapshot3 = await snapshotProvider.queryProposalAuthorsAboveX(input3);

    // const input4 = {
    //   space: "sismo.eth",
    // };
    // const snapshot4 = await snapshotProvider.querySpaceAdmins(input4);

    // const input5 = {
    //   space: "sismo.eth",
    //   forcedValue: 10,
    // };
    // const snapshot5 = await snapshotProvider.querySpaceVoters(input5);

    const snapshot6 = await snapshotProvider.querySpaceVotersAboveX({
      space: "sismo.eth",
      abovex: 2,
    });

    return [
      {
        name: "example-snapshot",
        timestamp: context.timestamp,
        description: "get all snapshot queries",
        specs: "",
        data: snapshot6,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};
export default generator;
