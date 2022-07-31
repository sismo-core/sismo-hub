import { gql } from "graphql-request";
import { Tags, ValueType, GroupWithData } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { dataProviders } from "../../helpers/providers";
import { GenerationContext } from "../../../src/topics/generation-context";

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
