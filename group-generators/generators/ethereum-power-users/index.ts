import { dataOperators } from "@group-generators/helpers/data-operators";
import {
  AccountSource,
  GroupStore,
  GroupWithData,
  Tags,
  ValueType,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["ethereum-most-transactions"],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const latestGroupsMostTransactions = await Promise.all(
      ["2016", "2017", "2018", "2019", "2020", "2021", "2022"].map(async (year) => {
        return groupStore.latest(`ethereum-most-transactions-${year}`);
      })
    );

    const ethereumPowerUsers = dataOperators.Union(
      await Promise.all(
        latestGroupsMostTransactions.map(async (group) => await group.data())
      )
    );
    return [
      {
        name: "ethereum-power-users",
        timestamp: context.timestamp,
        description: "Data Group of the top 0.1% most active users on Ethereum",
        specs: "Contains the top 50k addresses that sent the most transactions (token transfers excluded) on Ethereum between 2015 and December 31st 2016, or between 2015 and December 31st 2017, or between 2015 and December 31st 2018, or between 2015 and December 31st 2019, or between 2015 and December 31st 2020, or between 2015 and December 31st 2021, or between 2015 and December 31st 2022",
        data: ethereumPowerUsers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.Mainnet, Tags.Maintained],
      },
    ];
  },
};

export default generator;
