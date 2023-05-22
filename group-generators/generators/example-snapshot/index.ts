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
    //   date: "2022-09-01",
    // };

    // const input2 = {
    //   proposal:
    //     "0x6b0c32f57d7f4943811ccdcf00246e3cb5a4e3faeffd0f067ce25e8ef8b23ffa",
    // };

    // const input3 = "sismo.eth";

    // const snapshot2 = await snapshotProvider.querySpaceFollowers(input);
    // const snapshot2 = await snapshotProvider.queryProposalVoters(input2);
    // const snapshot3 = await snapshotProvider.queryProposalAuthors(input3);
    // const snapshot4 = await snapshotProvider.querySpaceAdmins(input3);
    // const snapshot5 = await snapshotProvider.querySpaceVoters({
    //   space: input3,
    // });

    // const snapshot6 = await snapshotProvider.querySpaceVotersAboveX({
    //   space: input3,
    //   abovex: 5,
    // });

    const snapshot7 = await snapshotProvider.queryProposalAuthorsAboveX({
      abovex: 5,
    });

    console.log(snapshot7);

    return [
      {
        name: "example-snapshot",
        timestamp: context.timestamp,
        description: "get all snapshot queries",
        specs: "",
        data: snapshot7,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};
export default generator;
