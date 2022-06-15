import BigQueryProvider from "./big-query/big-query";
import { PoapSubgraphProvider } from './poap';
import { SnapshotProvider } from "./snapshot";
import { SubgraphHostedServiceProvider } from "./subgraph";

export const dataProviders = {
  SnapshotProvider,
  BigQueryProvider,
  SubgraphHostedServiceProvider,
  PoapSubgraphProvider
};
