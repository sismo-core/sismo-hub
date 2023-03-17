import { BigQueryProvider } from "./big-query/big-query";
import { DegenScoreProvider } from "./degenscore";
import { EnsProvider } from "./ens";
import { EthLeaderboardProvider } from "./eth-leaderboard";
import { FarcasterProvider } from "./farcaster";
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
import {
  SismoSubgraphProvider,
  SismoSubgraphBaseProvider,
} from "./sismo-subgraph";
import { SnapshotProvider } from "./snapshot";
import snapshotInterfaceSchema from "./snapshot/interface-schema.json";
import {
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
} from "./subgraph";
import { TalentLayerProvider } from "./talentlayer";
import { TokenProvider } from "./token-provider";
import tokenProviderInterfaceSchema from "./token-provider/interface-schema.json";
import { TransposeProvider } from "./transpose";
import { WiwBadgeProvider } from "./wiw-badge";
import wiwBadgeInterfaceSchema from "./wiw-badge/interface-schema.json";
import { DataProviders } from "topics/data-provider";

export const dataProviders = {
  BigQueryProvider,
  EnsProvider,
  EthLeaderboardProvider,
  FarcasterProvider,
  DegenScoreProvider,
  GithubProvider,
  GraphQLProvider,
  HiveProvider,
  JsonRpcProvider,
  LensProvider,
  PoapSubgraphProvider,
  RestProvider,
  SismoSubgraphProvider,
  SismoSubgraphBaseProvider,
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
  SnapshotProvider,
  TalentLayerProvider,
  TokenProvider,
  TransposeProvider,
  WiwBadgeProvider,
};

export const dataProvidersInterfacesSchemas = [
  githubInterfaceSchema,
  HiveInterfaceSchema,
  lensInterfaceSchema,
  poapInterfaceSchema,
  restInterfaceSchema,
  snapshotInterfaceSchema,
  tokenProviderInterfaceSchema,
  wiwBadgeInterfaceSchema,
];

export const dataProvidersAPIEndpoints = {
  DegenScoreProvider: {
    getBeaconOwnersWithScoreCount: async ({ score }: { score: number }) =>
      new DegenScoreProvider().getBeaconOwnersWithScoreCount(score),
  },
  GithubProvider: {
    getRepositoriesContributorsCount: async (_: any) =>
      new GithubProvider().getRepositoriesContributorsCount(_),
    getRepositoriesStargazersCount: async (_: any) =>
      new GithubProvider().getRepositoriesStargazersCount(_),
  },
  LensProvider: {
    getFollowersCount: async (_: any) =>
      new LensProvider().getFollowersCount(_),
    getPublicationCollectorsCount: async (_: any) =>
      new LensProvider().getPublicationCollectorsCount(_),
    getPublicationMirrorsCount: async (_: any) =>
      new LensProvider().getPublicationMirrorsCount(_),
  },
  HiveProvider: {
    getInfluencersFromClusterWithMinimumFollowersCount: async (_: any) =>
      new HiveProvider().getInfluencersFromClusterWithMinimumFollowersCount(_),
  },
  PoapSubgraphProvider: {
    queryEventsTokenOwnersCount: async (_: any) =>
      new PoapSubgraphProvider().queryEventsTokenOwnersCount(_),
  },
  RestProvider: {
    getAccountsCountFromAPI: async (_: any) =>
      new RestProvider().getAccountsCountFromAPI(_),
  },
  SnapshotProvider: {
    querySpaceVotersCount: async (_: any) =>
      new SnapshotProvider().querySpaceVotersCount(_),
    queryProposalVotersCount: async (_: any) =>
      new SnapshotProvider().queryProposalVotersCount(_),
  },
  TalentLayerProvider: {
    getTalentLayerUserCount: async () =>
      new TalentLayerProvider().getTalentLayerUsersCount(),
  },
  TokenProvider: {
    getERC20HoldersCount: async ({
      contractAddress,
    }: {
      contractAddress: string;
    }) => new TokenProvider().getERC20HoldersCount({ contractAddress }),
    getNftHoldersCount: async ({
      contractAddress,
    }: {
      contractAddress: string;
    }) => new TokenProvider().getNftHoldersCount({ contractAddress }),
  },
  WiwBadgeProvider: {
    queryBadgeHoldersCount: async (_: any) =>
      new WiwBadgeProvider().queryBadgeHoldersCount(_),
  },
};

export const mainDataProviders: DataProviders = {
  interfaces: dataProvidersInterfacesSchemas,
  apiEndpoints: dataProvidersAPIEndpoints,
};
