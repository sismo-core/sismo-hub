import {
  getFollowersCountQuery,
  getFollowersQuery,
  getWhoCollectedPublicationQuery,
  getWhoCollectedPublicationCountQuery,
  getWhoMirroredPublicationQuery,
  getWhoMirroredPublicationCountQuery,
  getProfilesRankQuery,
  getProfilesRankCountQuery,
  getPublicationReactorsQuery,
  getPublicationReactorsCountQuery,
} from "./queries";
import { PublicationReaction } from "./types";
import { BigQueryProvider, SupportedNetwork } from "@group-generators/helpers/data-providers/big-query";
// import { EnsProvider } from "@group-generators/helpers/data-providers/ens";
import {
  // ExploreProfileType,
  // FollowerType,
  // GetFollowersType,
  // GetWhoCollectedPublicationType,
  // GetWhoMirroredPublicationType,
  // ProfileType,
  ProfileId,
  PublicationId,
  // Wallet,
} from "@group-generators/helpers/data-providers/lens/types";
// import { retryRequest } from "@group-generators/helpers/data-providers/utils/utils";
import { FetchedData } from "topics/group";

export class LensProviderBigQuery extends BigQueryProvider {

  constructor() {
    super({
      network: SupportedNetwork.POLYGON,
    });
  }

  public async getFollowers(profileId: ProfileId): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getFollowersQuery(profileId);
    dataProfiles = await this.fetch(query);
    return dataProfiles;
  }

  public async getFollowersCount(profileId: ProfileId): Promise<number> {
    const query = getFollowersCountQuery(profileId);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getWhoCollectedPublication(publication: PublicationId): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getWhoCollectedPublicationQuery(publication);
    dataProfiles = await this.fetch(query);
    return dataProfiles;
  }

  public async getWhoCollectedPublicationCount(publication: PublicationId): Promise<number> {
    const query = getWhoCollectedPublicationCountQuery(publication);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getWhoMirroredPublication(publication: PublicationId): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getWhoMirroredPublicationQuery(publication);
    dataProfiles = await this.fetch(query);
    return dataProfiles;
  }

  public async getWhoMirroredPublicationCount(publication: PublicationId): Promise<number> {
    const query = getWhoMirroredPublicationCountQuery(publication);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getProfilesRank(rankingCriteria: {rank: number}): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getProfilesRankQuery(rankingCriteria.rank);
    dataProfiles = await this.fetch(query);
    return dataProfiles;
  }

  public async getProfilesRankCount(rankingCriteria: {rank: number}): Promise<number> {
    const query = getProfilesRankCountQuery(rankingCriteria.rank);
    const count = await this.fetchCount(query);
    if(count) {
      return rankingCriteria.rank;
    }
    return count;
  }

  public async getPublicationReactors(publicationReaction: PublicationReaction): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getPublicationReactorsQuery(publicationReaction);
    dataProfiles = await this.fetch(query);
    return dataProfiles;
  }

  public async getPublicationReactorsCount(publicationReaction: PublicationReaction): Promise<number> {
    const query = getPublicationReactorsCountQuery(publicationReaction);
    const count = await this.fetchCount(query);
    return count;
  }






//   public async *exploreProfilesWithMaxRank(
//     maxRank: number
//   ): AsyncGenerator<ProfileType, void, undefined> {
//     let cursor = "";
//     let counter = 0;
//     let lensProfiles: ExploreProfileType;
//     do {
//       lensProfiles = await exploreRankedProfilesQuery(this, cursor);
//       yield* lensProfiles.exploreProfiles.items;
//       cursor = lensProfiles.exploreProfiles.pageInfo.next;
//       counter++;
//     } while (counter < maxRank / 50);
//   }

}

