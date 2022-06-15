import { ValueType, Tags } from "../../../src/list";
import {
  GenerationFrequency,
  GeneratorContext,
  ListGenerator,
} from "../../../src/list-generator";
import { List } from "../../../src/list/list";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";

export default new ListGenerator({
  id: 1,
  name: "eth-owner",
  generate: async (context: GeneratorContext): Promise<List> => {
    // minimal number of ether to be taken
    const minNumberOfEth = 1;
    // use the big query stream provider for huge query
    const bigQueryProvider = new BigQueryProvider();
    const query = `
      select address, eth_balance as value from \`bigquery-public-data.crypto_ethereum.balances\` as balances where eth_balance > ${minNumberOfEth}*POWER(10,18) 
      order by address;
    `;
    const accountsData = await bigQueryProvider.fetch(query);
    return new List({
      generationDate: new Date(context.timestamp),
      data: accountsData,
      valueType: ValueType.Score,
      tags: [Tags.Asset, Tags.Mainnet],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
