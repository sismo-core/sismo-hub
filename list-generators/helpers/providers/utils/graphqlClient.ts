import { GraphQLClient as graphqlRequestClient, gql } from 'graphql-request';

export class GraphQLClient {
    graphQLClient: graphqlRequestClient;

    constructor(url: string) {
        this.graphQLClient = new graphqlRequestClient(url);
    }

    async graphqlRequest(request: string, variables: Object) {
      return await this.graphQLClient.request(
        gql`
          ${request}
        `,
        variables,
      );
    };
}