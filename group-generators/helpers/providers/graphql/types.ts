import { GraphQLClient, RequestDocument } from "graphql-request";
import { MaybeFunction } from "graphql-request/dist/types";

export interface IGraphQLProvider {
  readonly graphQLClient: GraphQLClient;
  query<T extends Record<string, unknown>>(query: RequestDocument): Promise<T>;
}

export type GraphQLProviderOptions = {
  url: string;
  headers?: MaybeFunction<Record<string, string>>;
};
