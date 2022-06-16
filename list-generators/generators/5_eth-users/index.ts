import { ValueType, Tags } from "../../../src/list";
import {
  GenerationFrequency,
  GeneratorContext,
  ListGenerator,
} from "../../../src/list-generator";
import { List } from "../../../src/list/list";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";

export default new ListGenerator({
  id: 5,
  name: "eth-users",
  generate: async (context: GeneratorContext): Promise<List> => {
    const bigQueryProvider = new BigQueryProvider();
    const accountsData = await bigQueryProvider.getEthTransactions({
      minNumberOfTransactions: 20,
    });
    return new List({
      generationDate: new Date(context.timestamp),
      data: accountsData,
      valueType: ValueType.Score,
      tags: [Tags.Mainnet, Tags.Asset],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
