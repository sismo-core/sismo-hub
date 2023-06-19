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
  getProfileFromAddressQuery,
  getProfileFromHandleQuery,
} from "./queries";
import { Hashtag, PublicationReaction } from "./types";
import { BigQueryProvider, SupportedNetwork } from "@group-generators/helpers/data-providers/big-query";
import { EnsProvider } from "@group-generators/helpers/data-providers/ens";
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
    const resolvedProfileId = await this._getProfileIdFromAnySources(profileId);
    const query = getFollowersQuery(resolvedProfileId);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getFollowersCount(profileId: ProfileId): Promise<number> {
    const resolvedProfileId = await this._getProfileIdFromAnySources(profileId);
    const query = getFollowersCountQuery(resolvedProfileId);
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

  private async _getProfileFromAddress(address: string): Promise<ProfileId> {
    const query = getProfileFromAddressQuery(address);
    const response = await this.fetch(query);
    if(response[0].length === 0) {
      throw new Error(`Invalid input: No profile found for address: ${address}`);
    }
    const profileId = response[0][0]["profile_id"];
    return {
      profileId: profileId,
    } as ProfileId;
  }

  private async _getProfileFromHandle(handle: string): Promise<ProfileId> {
    const query = getProfileFromHandleQuery(handle);
    const response = await this.fetch(query);
    if(response[0].length === 0) {
      throw new Error(`Invalid input: No profile found for handle: ${handle}`);
    }
    const profileId = response[0][0]["profile_id"];
    return {
      profileId: profileId,
    } as ProfileId;
  }

  private async _getProfileIdFromAnySources(profileId: ProfileId): Promise<ProfileId> {
    let formattedProfileId = {} as ProfileId;
    // Check if input is a valid eth address
    if (profileId.profileId.match(/^0x[a-fA-F0-9]{40}$/g)) {
      formattedProfileId = await this._getProfileFromAddress(profileId.profileId);
    }
    // Check if input is a valid ENS
    else if (profileId.profileId.match("\\.eth$")) {
      const ensProvider = new EnsProvider();
      const ethAddress = await ensProvider.resolveEnsFromJsonRpc(profileId.profileId);
      if(ethAddress === "0x0000000000000000000000000000000000000000"){
        throw new Error("Invalid input: No profile found for this ENS");
      }
      formattedProfileId = await this._getProfileFromAddress(ethAddress);
    }
    // Check if input is a valid lens handle
    else if (profileId.profileId.match("\\.lens$")) {
      formattedProfileId = await this._getProfileFromHandle(profileId.profileId);
    }
    // Check if input is a valid lens profile id
    else if (profileId.profileId.match(/^0x[a-fA-F0-9]{0,39}$/g)) {
      formattedProfileId = profileId;
    }
    // Check if input is a valid lens handle without .lens
    else {
      const forcedLensHandle = profileId.profileId + ".lens";
      formattedProfileId = await this._getProfileFromHandle(forcedLensHandle);
    }
    if(!formattedProfileId) {
      throw new Error(`Invalid input: No profile found for ${profileId.profileId}`);
    }
    return formattedProfileId;
  }
}