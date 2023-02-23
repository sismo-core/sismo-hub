import { dataOperators } from "@group-generators/helpers/data-operators";
import BigQueryProvider from "@group-generators/helpers/data-providers/big-query/big-query";
import BigQueryHelper from "@group-generators/helpers/data-providers/big-query/helper";
import { AccountSource, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const groups: GroupWithData[] = [];
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

      // const mostTransactionsUsers = await bigQueryProvider.fetch(query);
      // frontend was only issuing badges with value 1
      // value should be thought as "tier" from now on
      // and suit a particular usecase

      const mostTransactionsUsers = dataOperators.Map(
        await bigQueryProvider.fetch(query),
        1
      );

      groups.push({
        name: `ethereum-most-transactions-${year}`,
        timestamp: context.timestamp,
        description: `The ${year} Ethereum users with the most transactions`,
        specs: "",
        data: mostTransactionsUsers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.Mainnet],
      });
    }
    return groups;
  },
};

export default generator;
