import { Group, Tags, ValueType } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { GenerationContext } from "../../../src/topics/generation-context";
import { dataOperators } from "../../helpers/data-operators";

export default new GroupGenerator({
  generate: async (context: GenerationContext): Promise<Group[]> => {
    const latestGroupsMostTransactions = await Promise.all(
      ["2016", "2017", "2018", "2019", "2020", "2021"].map(async (year) => {
        return Group.store.latest(`ethereum-most-transactions-${year}`);
      })
    );

    const ethereumPowerUsers = dataOperators.Join(
      ...(await Promise.all(
        latestGroupsMostTransactions.map(async (group) => await group.data())
      ))
    );
    return [
      new Group({
        name: "ethereum-power-users",
        timestamp: context.timestamp,
        data: ethereumPowerUsers,
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.Mainnet],
      }),
    ];
  },
  generationFrequency: GenerationFrequency.Once,
});
