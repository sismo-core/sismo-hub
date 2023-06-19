import {
  getFollowersCountQuery,
  getFollowersQuery,
  getProfilesRankQuery,
  getProfilesRankCountQuery,
  getHashtagMentionersQuery,
  getHashtagMentionersCountQuery,
  getPublicationCollectorsQuery,
  getPublicationCollectorsCountQuery,
  getPublicationMirrorersQuery,
  getPublicationMirrorersCountQuery,
  getPublicationReactorsQuery,
  getPublicationReactorsCountQuery,
  getPublicationCommentersQuery,
  getPublicationCommentersCountQuery,
} from "./queries";
import { Hashtag, PublicationReaction } from "./types";
import { BigQueryProvider, SupportedNetwork } from "@group-generators/helpers/data-providers/big-query";
import {
  ProfileId,
  PublicationId,
} from "@group-generators/helpers/data-providers/lens/types";
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
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getFollowersCount(profileId: ProfileId): Promise<number> {
    const query = getFollowersCountQuery(profileId);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getPublicationCollectors(publication: PublicationId): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getPublicationCollectorsQuery(publication);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getPublicationCollectorsCount(publication: PublicationId): Promise<number> {
    const query = getPublicationCollectorsCountQuery(publication);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getPublicationMirrorers(publication: PublicationId): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getPublicationMirrorersQuery(publication);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getPublicationMirrorersCount(publication: PublicationId): Promise<number> {
    const query = getPublicationMirrorersCountQuery(publication);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getProfilesRank(rankingCriteria: {rank: number}): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getProfilesRankQuery(rankingCriteria.rank);
    dataProfiles = await this.fetchAccounts(query);
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
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getPublicationReactorsCount(publicationReaction: PublicationReaction): Promise<number> {
    const query = getPublicationReactorsCountQuery(publicationReaction);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getPublicationCommenters(publicationId: PublicationId): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getPublicationCommentersQuery(publicationId);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getPublicationCommentersCount(publicationId: PublicationId): Promise<number> {
    const query = getPublicationCommentersCountQuery(publicationId);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getHashtagMentioners(hashtag: Hashtag): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const formatedHashtag: Hashtag = {hashtag: hashtag.hashtag.toLowerCase()};
    const query = getHashtagMentionersQuery(formatedHashtag);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getHashtagMentionersCount(hashtag: Hashtag): Promise<number> {
    const formatedHashtag: Hashtag = {hashtag: hashtag.hashtag.toLowerCase()};
    const query = getHashtagMentionersCountQuery(formatedHashtag);
    const count = await this.fetchCount(query);
    return count;
  }
}