import { BigQueryProvider } from "./big-query/big-query";
import { EnsProvider } from "./ens";
import { EthLeaderboardProvider } from "./eth-leaderboard";
import { FarcasterProvider } from "./farcaster";
import { GithubProvider } from "./github";
import githubInterfaceSchema from "./github/interface-schema.json";
import { GraphQLProvider } from "./graphql";
import { HiveProvider } from "./hive";
import HiveInterfaceSchema from "./hive/interface-schema.json";
import { JsonRpcProvider } from "./json-rpc";
import { OnchainVerifier } from "./onchain-verifier";
import OnchainVerifierInterfaceSchema from "./onchain-verifier/interface-schema.json";
import { ContractConfig } from "./onchain-verifier/types";
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
  GithubProvider,
  GraphQLProvider,
  HiveProvider,
  JsonRpcProvider,
  OnchainVerifier,
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
  OnchainVerifierInterfaceSchema,
  lensInterfaceSchema,
  poapInterfaceSchema,
  restInterfaceSchema,
  snapshotInterfaceSchema,
  tokenProviderInterfaceSchema,
  wiwBadgeInterfaceSchema,
];

export const dataProvidersAPIEndpoints = {
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
  OnchainVerifier: {
    getApprovedAddressesCount: async ({
      contractAddress,
      network
    }: ContractConfig) => new OnchainVerifier().getApprovedAddressesCount({ contractAddress, network }),
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
