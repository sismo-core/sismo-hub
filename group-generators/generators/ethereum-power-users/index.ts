import { dataOperators } from "@group-generators/helpers/data-operators";
import { GroupStore, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const latestGroupsMostTransactions = await Promise.all(
      ["2016", "2017", "2018", "2019", "2020", "2021"].map(async (year) => {
        return groupStore.latest(`ethereum-most-transactions-${year}`);
      })
    );

    const ethereumPowerUsers = dataOperators.Join(
      ...(await Promise.all(
        latestGroupsMostTransactions.map(async (group) => await group.data())
      ))
    );
    return [
      {
        name: "ethereum-power-users",
        timestamp: context.timestamp,
        data: ethereumPowerUsers,
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.Mainnet],
      },
    ];
  },
};

export default generator;
