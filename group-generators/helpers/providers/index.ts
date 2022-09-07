import BigQueryProvider from "./big-query/big-query";
import { GraphQLProvider } from "./graphql";
import { LensProvider } from "./lens";
import { PoapSubgraphProvider } from "./poap";
import { SnapshotProvider } from "./snapshot";
import {
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
} from "./subgraph";

export const dataProviders = {
  GraphQLProvider,
  SnapshotProvider,
  BigQueryProvider,
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
  PoapSubgraphProvider,
  LensProvider,
};
