import BigQueryProvider from "./big-query/big-query";
import { GraphQLProvider } from "./graphql";
import { PoapSubgraphProvider } from "./poap";
import { SnapshotProvider } from "./snapshot";
import { SubgraphHostedServiceProvider } from "./subgraph";

export const dataProviders = {
  GraphQLProvider,
  SnapshotProvider,
  BigQueryProvider,
  SubgraphHostedServiceProvider,
  PoapSubgraphProvider,
};
