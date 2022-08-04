import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/providers";
import { GenerationContext } from "topics/generation-context";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationFrequency, GroupGenerator } from "topics/group-generator";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
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

    return [
      {
        name: "sismo-domains",
        timestamp: context.timestamp,
        data: fetchedData,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.ENS, Tags.User],
      },
    ];
  }
}
