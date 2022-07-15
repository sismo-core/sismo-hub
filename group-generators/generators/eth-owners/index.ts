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
    const minNumberOfEth = 1;
    const bigQueryProvider = new BigQueryProvider();
    const query = `
      select address, eth_balance as value from \`bigquery-public-data.crypto_ethereum.balances\` as balances where eth_balance > ${minNumberOfEth}*POWER(10,18) 
      order by address;
    `;
    const accountsData = await bigQueryProvider.fetch(query);
    return [
      new Group({
        name: "eth-owners",
        timestamp: context.timestamp,
        data: accountsData,
        valueType: ValueType.Score,
        tags: [Tags.Asset, Tags.Mainnet],
      }),
    ];
  },
  generationFrequency: GenerationFrequency.Once,
});
