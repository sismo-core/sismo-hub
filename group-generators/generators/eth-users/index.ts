import { ValueType, Tags } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group/group";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";

export default new GroupGenerator({
  name: "eth-users",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const bigQueryProvider = new BigQueryProvider();
    const accountsData = await bigQueryProvider.getEthTransactions({
      minNumberOfTransactions: 20,
    });
    return new Group({
      generationDate: new Date(context.timestamp),
      data: accountsData,
      valueType: ValueType.Score,
      tags: [Tags.Mainnet, Tags.Asset],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
