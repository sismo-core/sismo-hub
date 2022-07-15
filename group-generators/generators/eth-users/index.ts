import { ValueType, Tags } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { GenerationContext } from "../../../src/topics/generation-context";
import { Group } from "../../../src/topics/group";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";

export default new GroupGenerator({
  generate: async (context: GenerationContext): Promise<Group[]> => {
    const bigQueryProvider = new BigQueryProvider();
    const accountsData = await bigQueryProvider.getEthTransactions({
      minNumberOfTransactions: 20,
    });
    return [
      new Group({
        name: "eth-users",
        timestamp: context.timestamp,
        data: accountsData,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.Asset],
      }),
    ];
  },
  generationFrequency: GenerationFrequency.Once,
});
