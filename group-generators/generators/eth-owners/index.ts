import { ValueType, Tags } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";

export default new GroupGenerator({
  name: "eth-owners",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const minNumberOfEth = 1;
    const bigQueryProvider = new BigQueryProvider();
    const query = `
      select address, eth_balance as value from \`bigquery-public-data.crypto_ethereum.balances\` as balances where eth_balance > ${minNumberOfEth}*POWER(10,18) 
      order by address;
    `;
    const accountsData = await bigQueryProvider.fetch(query);
    return new Group({
      generationDate: new Date(context.timestamp),
      data: accountsData,
      valueType: ValueType.Score,
      tags: [Tags.Asset, Tags.Mainnet],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
