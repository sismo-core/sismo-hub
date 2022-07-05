import { GraphQLClient, RequestDocument, Variables } from "graphql-request";
import { GraphQLProviderOptions, IGraphQLProvider } from "./types";

export class GraphQLProvider implements IGraphQLProvider {
  readonly graphQLClient: GraphQLClient;

  constructor(options: GraphQLProviderOptions) {
    this.graphQLClient = new GraphQLClient(options.url, {
      headers: options.headers,
    });
  }

  /**
   * Use this method to make any query to the given GraphQL endpoint.
   * @param query The graphql query to execute
   * @param variables Variables for the query
   * @param headers Optional headers
   * @returns The data returned from the query
   */
  public query<T extends Record<string, unknown>>(
    query: RequestDocument,
    variables?: Variables,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.graphQLClient.request<T>(query, variables, headers);
  }
}
