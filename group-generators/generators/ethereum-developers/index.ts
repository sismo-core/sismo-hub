import { ValueType, Tags } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";
import { dataOperators } from "../../helpers/data-operators";

/*
  Ethereum Developers group is constituted of Ethereum accounts that deployed at least one contract
  on mainnet or on polygon
*/
export default new GroupGenerator({
  name: "ethereum-developers",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const bigQueryProvider = new BigQueryProvider();
    const queryMainnet = `
    select from_address as address, count(*) as value from \`bigquery-public-data.crypto_ethereum.transactions\` 
          where to_address is null
          group by from_address
          order by from_address;
    `;
    const mainnetContractDeployers = await bigQueryProvider.fetch(queryMainnet);
    const queryPolygon = `
    select from_address as address, count(*) as value from \`public-data-finance.crypto_polygon.transactions\` 
          where to_address is null
          group by from_address
          order by from_address;
    `;
    const polygonContractDeployers = await bigQueryProvider.fetch(queryPolygon);

    return new Group({
      generationDate: new Date(context.timestamp),
      data: dataOperators.Join(
        mainnetContractDeployers,
        polygonContractDeployers
      ),
      valueType: ValueType.Info,
      tags: [Tags.User, Tags.Mainnet],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
