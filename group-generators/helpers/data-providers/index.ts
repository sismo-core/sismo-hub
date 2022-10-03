import BigQueryProvider from "./big-query/big-query";
import { EnsProvider } from "./ens";
import { EthLearderboardProvider } from "./eth-leaderboard";
import { GraphQLProvider } from "./graphql";
import { HiveProvider } from "./hive";
import { JsonRpcProvider } from "./json-rpc";
import { LensProvider } from "./lens";
import { PoapSubgraphProvider } from "./poap";
import { RESTProvider } from "./rest-api";
import { SnapshotProvider } from "./snapshot";
import {
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
} from "./subgraph";

export const dataProviders = {
  BigQueryProvider,
  EnsProvider,
  EthLearderboardProvider,
  GraphQLProvider,
  HiveProvider,
  JsonRpcProvider,
  LensProvider,
  PoapSubgraphProvider,
  RESTProvider,
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
  SnapshotProvider,
};
