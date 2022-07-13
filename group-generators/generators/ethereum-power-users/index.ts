import { ValueType, Tags } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";

/*
  Ethereum Power Users is a group constituted by the top 500 000 Ethereum accounts 
  that makes the most transactions
*/
export default new GroupGenerator({
  name: "ethereum-power-users",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const bigQueryProvider = new BigQueryProvider();
    const query = `
    with transactions as (
      select from_address as address, count(*) as nb_transaction from \`bigquery-public-data.crypto_ethereum.transactions\` 
      group by from_address
    )
    select address, nb_transaction as value
    from transactions
    order by nb_transaction DESC
    limit 500000;
    `;
    const mostTransactionsUsers = await bigQueryProvider.fetch(query);
    return new Group({
      generationDate: new Date(context.timestamp),
      data: mostTransactionsUsers,
      valueType: ValueType.Info,
      tags: [Tags.User, Tags.Mainnet],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
