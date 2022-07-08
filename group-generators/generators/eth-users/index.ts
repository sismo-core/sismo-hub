import { ValueType, Tags } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";
import {GroupsNames} from "../groups-names"

export default new GroupGenerator({
  name: "eth-users",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const bigQueryProvider = new BigQueryProvider();
    const accountsData = await bigQueryProvider.getEthTransactions({
      minNumberOfTransactions: 20,
    });
    return new Group({
      name: GroupsNames.ETH_USERS,
      generationDate: new Date(context.timestamp),
      data: accountsData,
      valueType: ValueType.Score,
      tags: [Tags.Mainnet, Tags.Asset],
      generatorName: "eth-users",
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
