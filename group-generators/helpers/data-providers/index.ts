import { Subgraph101Provider } from "./101";
import subgraph101InterfaceSchema from "./101/interface-schema.json";
import { AlchemyProvider } from "./alchemy";
import alchemyInterfaceSchema from "./alchemy/interface-schema.json";
import { AnkrProvider } from "./ankr";
import ankrInterfaceSchema from "./ankr/interface-schema.json";
import { AttestationStationProvider } from "./atst";
import attestationStationInterfaceSchema from "./atst/interface-schema.json";
import { BigQueryProvider } from "./big-query/big-query";
import { DegenScoreProvider } from "./degenscore";
import degenScoreInterfaceSchema from "./degenscore/interface-schema.json";
import { DuneProvider } from "./dune";
import duneInterfaceSchema from "./dune/interface-schema.json";
import { EnsProvider } from "./ens";
import { EthLeaderboardProvider } from "./eth-leaderboard";
import { FarcasterProvider } from "./farcaster";
import { GalxeProvider } from "./galxe";
import galxeInterfaceSchema from "./galxe/interface-schema.json";
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
import { OtterSpaceSubgraphProvider } from "./otterspace";
import otterspaceInterfaceSchema from "./otterspace/interface-schema.json";
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
  AnkrProvider,
  BigQueryProvider,
  DegenScoreProvider,
  DuneProvider,
  EnsProvider,
  EthLeaderboardProvider,
  FarcasterProvider,
  GalxeProvider,
  GithubProvider,
  GitPoapProvider,
  GraphQLProvider,
  GuildProvider,
  HiveProvider,
  JsonRpcProvider,
  LensProvider,
  OtterSpaceSubgraphProvider,
  PoapSubgraphProvider,
  RestProvider,
  SismoSubgraphProvider,
  SismoSubgraphBaseProvider,
  Subgraph101Provider,
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
  ankrInterfaceSchema,
  degenScoreInterfaceSchema,
  duneInterfaceSchema,
  galxeInterfaceSchema,
  githubInterfaceSchema,
  gitPoapInterfaceSchema,
  guildInterfaceSchema,
  HiveInterfaceSchema,
  lensInterfaceSchema,
  otterspaceInterfaceSchema,
  poapInterfaceSchema,
  restInterfaceSchema,
  snapshotInterfaceSchema,
  subgraph101InterfaceSchema,
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
    getAttestationValues: async (_: any) =>
      new AttestationStationProvider().getAttestationValues(_),
    getAttestationValuesCount: async (_: any) =>
      new AttestationStationProvider().getAttestationValuesCount(_),
  },
  AnkrProvider: {
    getTokenHoldersCount: async (_: any) =>
      new AnkrProvider().getTokenHoldersCount(_),
    getNftHoldersCount: async (_: any) =>
      new AnkrProvider().getNftHoldersCount(_),
  },
  DegenScoreProvider: {
    getBeaconOwnersWithScoreCount: async (_: any) =>
      new DegenScoreProvider().getBeaconOwnersWithScoreCount(_),
  },
  DuneProvider: {
    executeQueryCount: async (_: any) =>
      new DuneProvider().executeQueryCount(_),
  },
  GithubProvider: {
    getRepositoriesContributorsCount: async (_: any) =>
      new GithubProvider().getRepositoriesContributorsCount(_),
    getRepositoriesStargazersCount: async (_: any) =>
      new GithubProvider().getRepositoriesStargazersCount(_),
  },
  GalxeProvider: {
    getCampaignHoldersCount: async (_: any) =>
      new GalxeProvider().getCampaignHoldersCount(_),
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
  OtterSpaceSubgraphProvider: {
    getBadgeHolders: async (_: any) =>
      new OtterSpaceSubgraphProvider().getBadgeHoldersCount(_),
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
  Subgraph101Provider: {
    getQuestHoldersByNameCount: async (_: any) =>
      new Subgraph101Provider().getQuestHoldersByNameCount(_),
    getQuestHoldersByIdCount: async (_: any) =>
      new Subgraph101Provider().getQuestHoldersByIdCount(_),
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
