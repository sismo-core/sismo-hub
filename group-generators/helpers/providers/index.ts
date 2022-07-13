import BigQueryProvider from "./big-query/big-query";
import { GraphQLProvider } from "./graphql";
import { LensProvider } from "./lens";
import { PoapCrossChainSubgraphProvider, PoapSubgraphProvider } from "./poap";
import { SnapshotProvider } from "./snapshot";
import { SubgraphHostedServiceProvider } from "./subgraph";

export const dataProviders = {
  GraphQLProvider,
  SnapshotProvider,
  BigQueryProvider,
  SubgraphHostedServiceProvider,
  PoapSubgraphProvider,
  PoapCrossChainSubgraphProvider,
  LensProvider,
};
