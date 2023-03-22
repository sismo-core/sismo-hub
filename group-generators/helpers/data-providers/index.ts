import { AlchemyProvider } from "./alchemy";
import alchemyInterfaceSchema from "./alchemy/interface-schema.json";
import { AttestationStationProvider } from "./atst";
import attestationStationInterfaceSchema from "./atst/interface-schema.json";
import { BigQueryProvider } from "./big-query/big-query";
import { BscTokenProvider } from "./bsc-token-provider";
import bscTokenInterface from "./bsc-token-provider/interface-schema.json";
import { DegenScoreProvider } from "./degenscore";
import degenScoreInterfaceSchema from "./degenscore/interface-schema.json";
import { EnsProvider } from "./ens";
import { EthLeaderboardProvider } from "./eth-leaderboard";
import { FarcasterProvider } from "./farcaster";
import { GithubProvider } from "./github";
import githubInterfaceSchema from "./github/interface-schema.json";
import { GitPoapProvider } from "./gitpoap";
import gitPoapInterfaceSchema from "./gitpoap/interface-schema.json";
import { GraphQLProvider } from "./graphql";
import { GuildProvider } from "./guild";
import guildInterfaceSchema from "./guild/interface-schema.json";
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
  AlchemyProvider,
  AttestationStationProvider,
  BigQueryProvider,
  BscTokenProvider,
  DegenScoreProvider,
  EnsProvider,
  EthLeaderboardProvider,
  FarcasterProvider,
  GithubProvider,
  GitPoapProvider,
  GraphQLProvider,
  GuildProvider,
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
  alchemyInterfaceSchema,
  attestationStationInterfaceSchema,
  bscTokenInterface,
  degenScoreInterfaceSchema,
  githubInterfaceSchema,
  gitPoapInterfaceSchema,
  guildInterfaceSchema,
  HiveInterfaceSchema,
  lensInterfaceSchema,
  poapInterfaceSchema,
  restInterfaceSchema,
  snapshotInterfaceSchema,
  talentLayerProviderInterfaceSchema,
  tokenProviderInterfaceSchema,
  wiwBadgeInterfaceSchema,
];

export const getDataProvidersInterfacesSchemas =
  (): DataProviderInterface[] => {
    for (const dataProviderInterface of dataProvidersInterfacesSchemas) {
      for (const functionObject of dataProviderInterface.functions) {
        for (const arg of functionObject.args) {
          if (!supportedArgTypesInterfaces.includes(arg.type)) {
            throw new Error(
              `Argument type "${arg.type}" for ${
                dataProviderInterface.name
              } provider and function named "${
                functionObject.name
              }" is not supported.
The supported types are: ${supportedArgTypesInterfaces.join(", ")}`
            );
          }
        }
      }
    }
    return dataProvidersInterfacesSchemas;
  };

export const dataProvidersAPIEndpoints = {
  AlchemyProvider: {
    queryCollectionOwnersCount: async ({
      contractAddress,
    }: {
      contractAddress: string;
    }) => new AlchemyProvider().queryCollectionOwnersCount({ contractAddress }),
  },
  AttestationStationProvider: {
    getAttestations: async (_: any) =>
      new AttestationStationProvider().getAttestations(_),
    getAttestationsCount: async (_: any) =>
      new AttestationStationProvider().getAttestationsCount(_),
  },
  BscTokenProvider: {
    getTokenHoldersCount: async (_: any) =>
      new BscTokenProvider().getTokenHoldersCount(_),
    getNftHoldersCount: async (_: any) =>
      new BscTokenProvider().getNftHoldersCount(_),
  },
  DegenScoreProvider: {
    getBeaconOwnersWithScoreCount: async (_: any) =>
      new DegenScoreProvider().getBeaconOwnersWithScoreCount(_),
  },
  GithubProvider: {
    getRepositoriesContributorsCount: async (_: any) =>
      new GithubProvider().getRepositoriesContributorsCount(_),
    getRepositoriesStargazersCount: async (_: any) =>
      new GithubProvider().getRepositoriesStargazersCount(_),
  },
  GitPoapProvider: {
    getGitPoapHoldersByEventIdCount: async (_: any) =>
      new GitPoapProvider().getGitPoapHoldersByEventIdCount(_),
  },
  GuildProvider: {
    getGuildMembersCount: async (_: any) =>
      new GuildProvider().getGuildMembersCount(_),
    getRoleMembersCount: async (_: any) =>
      new GuildProvider().getRoleMembersCount(_),
  },
  HiveProvider: {
    getInfluencersFromClusterWithMinimumFollowersCount: async (_: any) =>
      new HiveProvider().getInfluencersFromClusterWithMinimumFollowersCount(_),
  },
  LensProvider: {
    getFollowersCount: async (_: any) =>
      new LensProvider().getFollowersCount(_),
    getPublicationCollectorsCount: async (_: any) =>
      new LensProvider().getPublicationCollectorsCount(_),
    getPublicationMirrorsCount: async (_: any) =>
      new LensProvider().getPublicationMirrorsCount(_),
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
  interfaces: getDataProvidersInterfacesSchemas,
  apiEndpoints: dataProvidersAPIEndpoints,
};
