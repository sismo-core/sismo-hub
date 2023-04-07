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
    const queryObj: DynamicGraphQLType = {
      graphQLQuery: GRAPHQL_QUERY,
      graphQLEndpoint: ENDPOINT,
      jmesPathQuery: JMESPATH,
    };

    const results = await dynamicGraphQLProvider.getGraphQLQuery(queryObj);

    console.log(results);

    return [
      {
        name: "dynamic-graphql",
        timestamp: context.timestamp,
        description: "insert whichever graphql you need",
        specs: "insert whichever graphql you need",
        data: results,
        valueType: ValueType.Score,
        accountSources: [AccountSource.ETHEREUM],
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
