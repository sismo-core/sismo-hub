import BigQueryProvider from "./big-query/big-query";
import { EnsProvider } from "./ens";
import { EthLearderboardProvider } from "./eth-leaderboard";
import { GithubProvider } from "./github";
import { GraphQLProvider } from "./graphql";
import { HiveProvider } from "./hive";
import { JsonRpcProvider } from "./json-rpc";
import { LensProvider } from "./lens";
import { PoapSubgraphProvider } from "./poap";
import { RESTProvider } from "./rest-api";
import SismoSubgraphProvider from "./sismo-subgraph/provider";
import { SnapshotProvider } from "./snapshot";
import {
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
} from "./subgraph";
import { TransposeProvider } from "./transpose";

export const dataProviders = {
  BigQueryProvider,
  EnsProvider,
  EthLearderboardProvider,
  GithubProvider,
  GraphQLProvider,
  HiveProvider,
  JsonRpcProvider,
  LensProvider,
  PoapSubgraphProvider: PoapSubgraphProvider,
  RESTProvider,
  SismoSubgraphProvider,
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
  SnapshotProvider,
  TransposeProvider,
};
