import BigQueryProvider from "./big-query/big-query";
import { EnsProvider } from "./ens";
import { EthLeaderboardProvider } from "./eth-leaderboard";
import { GithubProvider } from "./github";
import githubInterfaceSchema from "./github/interface-schema.json";
import { GraphQLProvider } from "./graphql";
import { HiveProvider } from "./hive";
import HiveInterfaceSchema from "./hive/interface-schema.json";
import { JsonRpcProvider } from "./json-rpc";
import { LensProvider } from "./lens";
import lensInterfaceSchema from "./lens/interface-schema.json";
import { PoapSubgraphProvider } from "./poap";
import poapInterfaceSchema from "./poap/interface-schema.json";
import { RestProvider } from "./rest-api";
import restInterfaceSchema from "./rest-api/interface-schema.json";
import SismoSubgraphProvider from "./sismo-subgraph/provider";
import { SnapshotProvider } from "./snapshot";
import snapshotInterfaceSchema from "./snapshot/interface-schema.json";
import { SubgraphHostedServiceProvider, SubgraphDecentralizedServiceProvider } from "./subgraph";
import { TransposeProvider } from "./transpose";
import { WiwBadgeProvider } from "./wiw-badge";
import wiwBadgeInterfaceSchema from "./wiw-badge/interface-schema.json";

export const dataProviders = {
  BigQueryProvider,
  EnsProvider,
  EthLeaderboardProvider,
  GithubProvider,
  GraphQLProvider,
  HiveProvider,
  JsonRpcProvider,
  LensProvider,
  PoapSubgraphProvider,
  RestProvider,
  SismoSubgraphProvider,
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
  SnapshotProvider,
  TransposeProvider,
  WiwBadgeProvider,
};

export const dataProviderInterfacesSchemas = [
  githubInterfaceSchema,
  HiveInterfaceSchema,
  lensInterfaceSchema,
  poapInterfaceSchema,
  restInterfaceSchema,
  snapshotInterfaceSchema,
  wiwBadgeInterfaceSchema,
];
