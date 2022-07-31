import { GroupWithData, Tags, ValueType } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";
import BigQueryHelper from "../../helpers/providers/big-query/helper";
import { GenerationContext } from "../../../src/topics/generation-context";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    const groups = [];
    const years = ["2016", "2017", "2018", "2019", "2020", "2021"];
    for (const year of years) {
      const bigQueryProvider = new BigQueryProvider();
      const query = `
        with transactions as (
          select from_address as address, count(*) as nb_transaction from \`bigquery-public-data.crypto_ethereum.transactions\`
          WHERE  block_timestamp <= '${year}-12-31' 
          AND ${BigQueryHelper.excludeExchangeAddresses()}
          AND ${BigQueryHelper.excludeReceiptStatusNull()}
          AND ${BigQueryHelper.excludeFunction("transfer(address,uint256)")}
          AND ${BigQueryHelper.excludeFunction(
            "safeTransferFrom(address,address,uint256,bytes)"
          )}
            AND ${BigQueryHelper.excludeFunction(
              "safeTransferFrom(address,address,uint256)"
            )}
              AND ${BigQueryHelper.excludeFunction(
                "transferFrom(address,address,uint256)"
              )}
                AND ${BigQueryHelper.excludeTransfer()}
        group by from_address
        )
        select address, nb_transaction as value
        from transactions
        order by nb_transaction DESC
        limit 50000;
        `;
      const mostTransactionsUsers = await bigQueryProvider.fetch(query);
      groups.push({
        name: `ethereum-most-transactions-${year}`,
        timestamp: context.timestamp,
        data: mostTransactionsUsers,
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.Mainnet],
      });
    }
    return groups;
  }
}
