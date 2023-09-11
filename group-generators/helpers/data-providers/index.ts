import { Subgraph101Provider } from "./101";
import subgraph101InterfaceSchema from "./101/interface-schema.json";
import { AlchemyProvider } from "./alchemy";
import alchemyInterfaceSchema from "./alchemy/interface-schema.json";
import { AnkrProvider } from "./ankr";
import ankrInterfaceSchema from "./ankr/interface-schema.json";
import { AttestationStationProvider } from "./atst";
import { BigQueryProvider } from "./big-query/big-query";
import { DegenScoreProvider } from "./degenscore";
import { DiscourseProvider } from "./discourse";
import { DuneProvider } from "./dune";
import { EthereumAttestationServiceProvider } from "./eas";
import ethereumAttestationServiceInterfaceSchema from "./eas/interface-schema.json";
import { EnsProvider } from "./ens";
import { EnsSubdomainProvider } from "./ens-subdomain";
import ensSubdomainInterfaceSchema from "./ens-subdomain/interface-schema.json";
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
import { JsonRpcProvider } from "./json-rpc";
import { LensProvider } from "./lens";
import { LensBigQueryProvider } from "./lens-bigquery";
import lensBigQueryInterfaceSchema from "./lens-bigquery/interface-schema.json";
import { MirrorXyzSubgraphProvider } from "./mirrorxyz";
import { OtterSpaceSubgraphProvider } from "./otterspace";
import otterspaceInterfaceSchema from "./otterspace/interface-schema.json";
import { PoapSubgraphProvider } from "./poap";
import poapInterfaceSchema from "./poap/interface-schema.json";
import { Rep3Provider } from "./rep3";
import rep3InterfaceSchema from "./rep3/interface-schema.json";
import { RestProvider } from "./rest-api";
import restInterfaceSchema from "./rest-api/interface-schema.json";
import { SafeProvider } from "./safe";
import safeInterfaceSchema from "./safe/interface-schema.json";
import { SismoSubgraphProvider, SismoSubgraphBaseProvider } from "./sismo-subgraph";
import { SnapshotProvider } from "./snapshot";
import snapshotInterfaceSchema from "./snapshot/interface-schema.json";
import { SubgraphHostedServiceProvider, SubgraphDecentralizedServiceProvider } from "./subgraph";
import { TalentLayerProvider } from "./talentlayer";
import talentLayerProviderInterfaceSchema from "./talentlayer/interface-schema.json";
import { TallyProvider } from "./tally";
import tallyProviderInterfaceSchema from "./tally/interface-schema.json";
import { TokenProvider } from "./token-provider";
import tokenProviderInterfaceSchema from "./token-provider/interface-schema.json";
import { TransposeProvider } from "./transpose";
import { UnlockSubgraphProvider } from "./unlock";
import unlockProviderInterfaceSchema from "./unlock/interface-schema.json";
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
  DiscourseProvider,
  DuneProvider,
  EthereumAttestationServiceProvider,
  EnsProvider,
  EnsSubdomainProvider,
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
  LensBigQueryProvider,
  MirrorXyzSubgraphProvider,
  OtterSpaceSubgraphProvider,
  PoapSubgraphProvider,
  Rep3Provider,
  RestProvider,
  SafeProvider,
  SismoSubgraphProvider,
  SismoSubgraphBaseProvider,
  Subgraph101Provider,
  SubgraphHostedServiceProvider,
  SubgraphDecentralizedServiceProvider,
  SnapshotProvider,
  TalentLayerProvider,
  TallyProvider,
  TokenProvider,
  TransposeProvider,
  UnlockSubgraphProvider,
  WiwBadgeProvider,
};

export const dataProvidersInterfacesSchemas: DataProviderInterface[] = [
  alchemyInterfaceSchema,
  ankrInterfaceSchema,
  ethereumAttestationServiceInterfaceSchema,
  ensSubdomainInterfaceSchema,
  galxeInterfaceSchema,
  githubInterfaceSchema,
  gitPoapInterfaceSchema,
  guildInterfaceSchema,
  lensBigQueryInterfaceSchema,
  otterspaceInterfaceSchema,
  poapInterfaceSchema,
  rep3InterfaceSchema,
  restInterfaceSchema,
  safeInterfaceSchema,
  snapshotInterfaceSchema,
  subgraph101InterfaceSchema,
  talentLayerProviderInterfaceSchema,
  tallyProviderInterfaceSchema,
  tokenProviderInterfaceSchema,
  unlockProviderInterfaceSchema,
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
  AlchemyProvider: {
    getOwnersForCollectionCount: async (_: any) =>
      new AlchemyProvider().getOwnersForCollectionCount(_),
    getOwnersOfNftsMatchingTraitCount: async (_: any) =>
      new AlchemyProvider().getOwnersOfNftsMatchingTraitCount(_),
    getOwnersOfTokenIdsCount: async (_: any) => new AlchemyProvider().getOwnersOfTokenIdsCount(_),
  },
  AnkrProvider: {
    getTokenHoldersCount: async (_: any) => new AnkrProvider().getTokenHoldersCount(_),
    getNftHoldersCount: async (_: any) => new AnkrProvider().getNftHoldersCount(_),
  },
  EnsSubdomainProvider: {
    getEnsSubdomainsCount: async (_: any) => new EnsSubdomainProvider().getEnsSubdomainsCount(_),
  },
  EthereumAttestationServiceProvider: {
    getAttestationRecipients: async (_: any) =>
      new EthereumAttestationServiceProvider().getAttestationRecipients(_),
    getAttestationRecipientsCount: async (_: any) =>
      new EthereumAttestationServiceProvider().getAttestationRecipientsCount(_),
    getAttestationValues: async (_: any) =>
      new EthereumAttestationServiceProvider().getAttestationValues(_),
    getAttestationValuesCount: async (_: any) =>
      new EthereumAttestationServiceProvider().getAttestationValuesCount(_),
  },
  GithubProvider: {
    getRepositoriesContributorsCount: async (_: any) =>
      new GithubProvider().getRepositoriesContributorsCount(_),
    getRepositoriesStargazersCount: async (_: any) =>
      new GithubProvider().getRepositoriesStargazersCount(_),
  },
  GalxeProvider: {
    getCampaignHoldersCount: async (_: any) => new GalxeProvider().getCampaignHoldersCount(_),
  },
  GitPoapProvider: {
    getGitPoapHoldersByEventIdCount: async (_: any) =>
      new GitPoapProvider().getGitPoapHoldersByEventIdCount(_),
  },
  GuildProvider: {
    getGuildMembersCount: async (_: any) => new GuildProvider().getGuildMembersCount(_),
    getRoleMembersCount: async (_: any) => new GuildProvider().getRoleMembersCount(_),
  },
  LensBigQueryProvider: {
    getFollowersCount: async (_: any) => new LensBigQueryProvider().getFollowersCount(_),
    getPublicationCollectorsCount: async (_: any) =>
      new LensBigQueryProvider().getPublicationCollectorsCount(_),
    getPublicationMirrorersCount: async (_: any) =>
      new LensBigQueryProvider().getPublicationMirrorersCount(_),
    getPublicationCommentersCount: async (_: any) =>
      new LensBigQueryProvider().getPublicationCommentersCount(_),
    getPublicationReactorsCount: async (_: any) =>
      new LensBigQueryProvider().getPublicationReactorsCount(_),
    getHashtagMentionersCount: async (_: any) =>
      new LensBigQueryProvider().getHashtagMentionersCount(_),
  },
  OtterSpaceSubgraphProvider: {
    getBadgeHolders: async (_: any) => new OtterSpaceSubgraphProvider().getBadgeHoldersCount(_),
  },
  PoapSubgraphProvider: {
    queryEventsTokenOwnersCount: async (_: any) =>
      new PoapSubgraphProvider().queryEventsTokenOwnersCount(_),
  },
  Rep3Provider: {
    getMembershipHoldersCount: async (_: any) => new Rep3Provider().getMembershipHoldersCount(_),
  },
  RestProvider: {
    getAccountsCountFromAPI: async (_: any) => new RestProvider().getAccountsCountFromAPI(_),
  },
  SafeProvider: {
    getSafeOwnersCount: async (_: any) => new SafeProvider().getSafeOwnersCount(_),
  },
  SnapshotProvider: {
    querySpaceVotersCount: async (_: any) => new SnapshotProvider().querySpaceVotersCount(_),
    queryProposalVotersCount: async (_: any) => new SnapshotProvider().queryProposalVotersCount(_),
    querySpaceFollowersCount: async (_: any) => new SnapshotProvider().querySpaceFollowersCount(_),
    querySpaceAuthorsCount: async (_: any) => new SnapshotProvider().querySpaceAuthorsCount(_),
    querySpaceAdminsCount: async (_: any) => new SnapshotProvider().querySpaceAdminsCount(_),
    querySpaceVotersAboveXCount: async (_: any) =>
      new SnapshotProvider().querySpaceVotersAboveXCount(_),
    queryProposalAuthorsAboveXCount: async (_: any) =>
      new SnapshotProvider().queryProposalAuthorsAboveXCount(_),
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
    didWorkOnTopicCount: async (_: any) => new TalentLayerProvider().didWorkOnTopicCount(_),
    didUserMinimalEarnedOfTokenCount: async (_: any) =>
      new TalentLayerProvider().didUserMinimalEarnedOfTokenCount(_),
    didWorkWithRatingCount: async (_: any) => new TalentLayerProvider().didWorkWithRatingCount(_),
    getTalentOfTheMonthCount: async (_: any) =>
      new TalentLayerProvider().getTalentOfTheMonthCount(_),
  },
  TallyProvider: {
    getGovernanceProposersCount: async (_: any) =>
      new TallyProvider().getGovernanceProposersCount(_),
    getGovernanceDelegatesCount: async (_: any) =>
      new TallyProvider().getGovernanceDelegatesCount(_),
    getGovernanceVotersCount: async (_: any) => new TallyProvider().getGovernanceVotersCount(_),
    getProposalVotersCount: async (_: any) => new TallyProvider().getProposalVotersCount(_),
  },
  TokenProvider: {
    getERC20HoldersCount: async (_: any) => new TokenProvider().getERC20HoldersCount(_),
    getERC721HoldersCount: async (_: any) => new TokenProvider().getERC721HoldersCount(_),
    getERC1155HoldersCount: async (_: any) => new TokenProvider().getERC1155HoldersCount(_),
  },
  UnlockSubgraphProvider: {
    getKeysInLockCount: async (_: any) => new UnlockSubgraphProvider().getKeysInLockCount(_),
  },
  WiwBadgeProvider: {
    queryBadgeHoldersCount: async (_: any) => new WiwBadgeProvider().queryBadgeHoldersCount(_),
  },
};

export const mainDataProviders: DataProviders = {
  interfaces: getDataProvidersInterfacesSchemas,
  apiEndpoints: dataProvidersAPIEndpoints,
};
