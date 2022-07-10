import { ValueType, Tags } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { Group } from "../../../src/topics/group";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";

export default new GroupGenerator({
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    const bigQueryProvider = new BigQueryProvider();
    const accountsData = await bigQueryProvider.getEthTransactions({
      minNumberOfTransactions: 20,
    });
    return [
      new Group({
        name: "eth-users",
        generationDate: new Date(context.timestamp),
        data: accountsData,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.Asset],
      }),
    ];
  },
  generationFrequency: GenerationFrequency.Once,
});
