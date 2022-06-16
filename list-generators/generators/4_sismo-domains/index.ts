import { gql } from "graphql-request";
import { Tags, ValueType } from "../../../src/list";
import {
  GenerationFrequency,
  GeneratorContext,
  ListGenerator,
} from "../../../src/list-generator";
import { List } from "../../../src/list/list";
import { dataProviders } from "../../helpers/providers";

export default new ListGenerator({
  id: 4,
  name: "sismo-domains",
  generate: async (context: GeneratorContext): Promise<List> => {
    // This list is constituted by all the users who have a sismo.eth domain
    const subgraphHostedServiceProvider =
      new dataProviders.SubgraphHostedServiceProvider({
        url: "https://api.thegraph.com/subgraphs/name/sismo-core/sismo-dao",
      });

    type ENSOwner = { owner: { id: string } };

    const sismoDomainOwners = await subgraphHostedServiceProvider.query<{
      domains: ENSOwner[];
    }>(
      gql`
        query getAllSismoDomainOwners {
          domains {
            owner {
              id
            }
          }
        }
      `
    );

    const fetchedData: { [address: string]: number } = {};

    for (const domain of sismoDomainOwners.domains.map((d) => d.owner.id)) {
      fetchedData[domain] = (fetchedData[domain] ?? 0) + 1;
    }

    // construct your list
    return new List({
      generationDate: new Date(context.timestamp),
      data: fetchedData,
      valueType: ValueType.Score,
      tags: [Tags.Mainnet, Tags.ENS, Tags.User],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
