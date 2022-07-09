import { gql } from "graphql-request";
import { Tags, ValueType } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import { dataProviders } from "../../helpers/providers";

export default new GroupGenerator({
  name: "sismo-domains",
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    // This group is constituted by all the users who have a sismo.eth domain
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

    return [new Group({
      name: "sismo-domains",
      generationDate: new Date(context.timestamp),
      data: fetchedData,
      valueType: ValueType.Score,
      tags: [Tags.Mainnet, Tags.ENS, Tags.User],
    })];
  },
  generationFrequency: GenerationFrequency.Once,
});
