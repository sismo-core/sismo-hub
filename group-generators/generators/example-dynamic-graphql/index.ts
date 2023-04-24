import { gql } from "graphql-request";
import {
  DynamicGraphQLProvider,
  DynamicGraphQLType,
} from "@group-generators/helpers/data-providers/dynamic-graphql";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const dynamicGraphQLProvider = new DynamicGraphQLProvider();
    const ENDPOINT = "https://hub.snapshot.org/graphql";
    const JMESPATH = `votes[].voter`;
    const GRAPHQL_QUERY: string = gql`
      query VotesQuery {
        votes(
          first: 1000
          skip: 0
          where: {
            proposal: "0xa1b00d332f3cc248ddccaf3fbdefd8af93b0fa2078121b4e6eb3db8ad63a6118"
          }
          orderBy: "created"
          orderDirection: desc
        ) {
          id
          voter
          vp
          vp_by_strategy
          vp_state
          created
          proposal {
            id
          }
          choice
          space {
            id
          }
        }
      }
    `;

    const ENDPOINT_2 =
      "https://api.thegraph.com/subgraphs/name/unlock-protocol/mainnet-v2";
    const JMESPATH_2 = `locks[0].keys[].owner`;

    const GRAPHQL_QUERY_2: string = gql`
      {
        locks(
          where: { address: "0x02699D0D6524a3322018E0C4fF021baC4Dbe616a" }
        ) {
          keys {
            owner {
              address
            }
            expiration
          }
        }
      }
    `;

    const ENDPOINT_3 = "https://api.sismo.io/";
    const JMESPATH_3 = `mintedBadges[].owner.id`;
    const GRAPHQL_QUERY_3: string = gql`
      {
        mintedBadges(where: { tokenId: 10000089 }) {
          owner {
            id
          }
        }
      }
    `;

    const queryObj_1: DynamicGraphQLType = {
      graphQLQuery: GRAPHQL_QUERY,
      graphQLEndpoint: ENDPOINT,
      jmesPathQuery: JMESPATH,
    };

    const queryObj_2: DynamicGraphQLType = {
      graphQLQuery: GRAPHQL_QUERY_2,
      graphQLEndpoint: ENDPOINT_2,
      jmesPathQuery: JMESPATH_2,
    };

    const queryObj_3: DynamicGraphQLType = {
      graphQLQuery: GRAPHQL_QUERY_3,
      graphQLEndpoint: ENDPOINT_3,
      jmesPathQuery: JMESPATH_3,
    };

    const results1 = await dynamicGraphQLProvider.getGraphQLQuery(queryObj_1);
    const results2 = await dynamicGraphQLProvider.getGraphQLQuery(queryObj_2);
    const results3 = await dynamicGraphQLProvider.getGraphQLQuery(queryObj_3);
    console.log(results1, results2, results3);

    return [
      {
        name: "example-dynamic-graphql",
        timestamp: context.timestamp,
        description: "insert whichever graphql you need",
        specs: "insert whichever graphql you need",
        data: results3,
        valueType: ValueType.Score,
        accountSources: [AccountSource.ETHEREUM],
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
