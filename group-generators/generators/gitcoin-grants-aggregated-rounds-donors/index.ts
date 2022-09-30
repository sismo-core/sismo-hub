import { dataOperators } from "@group-generators/helpers/data-operators";
import { ValueType, Tags, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["gitcoin-grants-rounds-donors"],

  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {

    const latestSpecificGitcoinRoundDonors = await Promise.all(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(async (roundNumber) => {
        return groupStore.latest(`gitcoin-grants-round-${roundNumber}-donors`);
      })
    );

    const gitcoinAggregatedRoundsDonors = dataOperators.Aggregation(
      await Promise.all(
        latestSpecificGitcoinRoundDonors.map(async (group) => await group.data())
      )
    );
    return [
      {
        name: "gitcoin-grants-aggregated-rounds-donors",
        timestamp: context.timestamp,
        data: gitcoinAggregatedRoundsDonors,
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.GitcoinGrant],
      },
    ];
  },
};

export default generator;
