import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
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
          domains(first: 1000) {
            owner {
              id
            }
          }
        }
      `
    );

    const fetchedData: { [address: string]: number } = {};

    for (const domain of sismoDomainOwners.domains.map((d) => d.owner.id)) {
      // fetchedData[domain] = (fetchedData[domain] ?? 0) + 1;
      fetchedData[domain] = 1;
      // frontend was only issuing badges with value 1
      // value should be thought as "tier" from now on
      // and suit a particular usecase
    }

    return [
      {
        name: "sismo-domains",
        timestamp: context.timestamp,
        description: "sismo.eth domain owners",
        specs:"",
        data: fetchedData,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.ENS, Tags.User],
      },
    ];
  },
};

export default generator;
