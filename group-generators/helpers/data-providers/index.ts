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
import { LensProvider } from "./lens";
import lensInterfaceSchema from "./lens/interface-schema.json";
import { PoapSubgraphProvider } from "./poap";
import poapInterfaceSchema from "./poap/interface-schema.json";
import { RestProvider } from "./rest-api";
import restInterfaceSchema from "./rest-api/interface-schema.json";
import { SismoSubgraphProvider, SismoSubgraphBaseProvider } from "./sismo-subgraph";
import { SnapshotProvider } from "./snapshot";
import snapshotInterfaceSchema from "./snapshot/interface-schema.json";
import { SubgraphHostedServiceProvider, SubgraphDecentralizedServiceProvider } from "./subgraph";
import { TalentLayerProvider } from "./talentlayer";
import talentLayerProviderInterfaceSchema from "./talentlayer/interface-schema.json";
import { TokenProvider } from "./token-provider";
import tokenProviderInterfaceSchema from "./token-provider/interface-schema.json";
import { TransposeProvider } from "./transpose";
import { WiwBadgeProvider } from "./wiw-badge";
import wiwBadgeInterfaceSchema from "./wiw-badge/interface-schema.json";
import {
  DataProviderInterface,
  DataProviders,
  supportedArgTypesInterfaces,
} from "topics/data-provider";

export const dataProviders = {
  BigQueryProvider,
  EnsProvider,
  EthLeaderboardProvider,
  FarcasterProvider,
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

export const dataProvidersInterfacesSchemas: DataProviderInterface[] = [
  githubInterfaceSchema,
  HiveInterfaceSchema,
  lensInterfaceSchema,
  poapInterfaceSchema,
  restInterfaceSchema,
  snapshotInterfaceSchema,
  talentLayerProviderInterfaceSchema,
  tokenProviderInterfaceSchema,
  wiwBadgeInterfaceSchema,
];

export const getDataProvidersInterfacesSchemas = (): DataProviderInterface[] => {
  for (const dataProviderInterface of dataProvidersInterfacesSchemas) {
    for (const functionObject of dataProviderInterface.functions) {
      for (const arg of functionObject.args) {
        if (!supportedArgTypesInterfaces.includes(arg.type)) {
          throw new Error(
            `Argument type "${arg.type}" for ${
              dataProviderInterface.name
            } provider and function named "${functionObject.name}" is not supported.
The supported types are: ${supportedArgTypesInterfaces.join(", ")}`
          );
        }
      }
    }
  }
  return dataProvidersInterfacesSchemas;
};

export const dataProvidersAPIEndpoints = {
  GithubProvider: {
    getRepositoriesContributorsCount: async (_: any) =>
      new GithubProvider().getRepositoriesContributorsCount(_),
    getRepositoriesStargazersCount: async (_: any) =>
      new GithubProvider().getRepositoriesStargazersCount(_),
  },
  LensProvider: {
    getFollowersCount: async (_: any) => new LensProvider().getFollowersCount(_),
    getPublicationCollectorsCount: async (_: any) =>
      new LensProvider().getPublicationCollectorsCount(_),
    getPublicationMirrorsCount: async (_: any) => new LensProvider().getPublicationMirrorsCount(_),
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
    getAccountsCountFromAPI: async (_: any) => new RestProvider().getAccountsCountFromAPI(_),
  },
  SnapshotProvider: {
    querySpaceVotersCount: async (_: any) => new SnapshotProvider().querySpaceVotersCount(_),
    queryProposalVotersCount: async (_: any) => new SnapshotProvider().queryProposalVotersCount(_),
  },
  TalentLayerProvider: {
    getUsersWithTalentLayerIdCount: async () =>
      new TalentLayerProvider().getUsersWithTalentLayerIdCount(),
    didSellerServiceBuyerCount: async (_: any) =>
      new TalentLayerProvider().didSellerServiceBuyerCount(_),
    didWorkOnTopicCount: async (_: any) =>
      new TalentLayerProvider().didWorkOnTopicCount(_),
    didUserMinimalEarnedOfTokenCount: async (_: any) =>
      new TalentLayerProvider().didUserMinimalEarnedOfTokenCount(_),
    didWorkWithRatingCount: async (_: any) =>
      new TalentLayerProvider().didWorkWithRatingCount(_),
    getTalentOfTheMonthCount: async (_: any) =>
      new TalentLayerProvider().getTalentOfTheMonthCount(_),
  },
  TokenProvider: {
    getERC20HoldersCount: async ({ contractAddress }: { contractAddress: string }) =>
      new TokenProvider().getERC20HoldersCount({ contractAddress }),
    getNftHoldersCount: async ({ contractAddress }: { contractAddress: string }) =>
      new TokenProvider().getNftHoldersCount({ contractAddress }),
  },
  WiwBadgeProvider: {
    queryBadgeHoldersCount: async (_: any) => new WiwBadgeProvider().queryBadgeHoldersCount(_),
  },
};

export const mainDataProviders: DataProviders = {
  interfaces: getDataProvidersInterfacesSchemas,
  apiEndpoints: dataProvidersAPIEndpoints,
};
