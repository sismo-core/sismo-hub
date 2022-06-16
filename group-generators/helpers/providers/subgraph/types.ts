import { GraphQLProviderOptions, IGraphQLProvider } from "../graphql/types";

export type SubgraphProviderOptions = Omit<GraphQLProviderOptions, "headers">;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISubgraphProvider extends IGraphQLProvider {}
