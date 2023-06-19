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
import { Hashtag, Profile, Publication, PublicationReaction, RankingCriteria } from "./types";
import { BigQueryProvider, SupportedNetwork } from "@group-generators/helpers/data-providers/big-query";
import { EnsProvider } from "@group-generators/helpers/data-providers/ens";
import { FetchedData } from "topics/group";

export class LensProviderBigQuery extends BigQueryProvider {

  constructor() {
    super({
      network: SupportedNetwork.POLYGON,
    });
  }

  public async getFollowers(profile: Profile): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const resolvedProfile = await this._getProfileIdFromAnySources(profile);
    const query = getFollowersQuery(resolvedProfile);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getFollowersCount(profile: Profile): Promise<number> {
    const resolvedProfile = await this._getProfileIdFromAnySources(profile);
    const query = getFollowersCountQuery(resolvedProfile);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getPublicationCollectors(publication: Publication): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getPublicationCollectorsQuery(publication);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getPublicationCollectorsCount(publication: Publication): Promise<number> {
    const query = getPublicationCollectorsCountQuery(publication);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getPublicationMirrorers(publication: Publication): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getPublicationMirrorersQuery(publication);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getPublicationMirrorersCount(publication: Publication): Promise<number> {
    const query = getPublicationMirrorersCountQuery(publication);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getPublicationCommenters(publication: Publication): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getPublicationCommentersQuery(publication);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getPublicationCommentersCount(publication: Publication): Promise<number> {
    const query = getPublicationCommentersCountQuery(publication);
    const count = await this.fetchCount(query);
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

  public async getHashtagMentioners(hashtag: Hashtag): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    if (hashtag.hashtag.charAt(0) === "#") {
      hashtag.hashtag = hashtag.hashtag.slice(1);
    }  
    const query = getHashtagMentionersQuery(hashtag);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getHashtagMentionersCount(hashtag: Hashtag): Promise<number> {
    if (hashtag.hashtag.charAt(0) === "#") {
      hashtag.hashtag = hashtag.hashtag.slice(1);
    }  
    const query = getHashtagMentionersCountQuery(hashtag);
    const count = await this.fetchCount(query);
    return count;
  }

  public async getProfilesRank(rankingCriteria: RankingCriteria): Promise<FetchedData> {
    let dataProfiles: FetchedData = {};
    const query = getProfilesRankQuery(rankingCriteria);
    dataProfiles = await this.fetchAccounts(query);
    return dataProfiles;
  }

  public async getProfilesRankCount(rankingCriteria: RankingCriteria): Promise<number> {
    const query = getProfilesRankCountQuery(rankingCriteria);
    const count = await this.fetchCount(query);
    if(count) {
      return rankingCriteria.rank;
    }
    return count;
  }

  private async _getProfileFromAddress(address: string): Promise<Profile> {
    const query = getProfileFromAddressQuery(address);
    const response = await this.fetch(query);
    if(response[0].length === 0) {
      throw new Error(`Invalid input: No profile found for address: ${address}`);
    }
    const profileId = response[0][0]["profile_id"];
    return {
      profileId: profileId,
    } as Profile;
  }

  private async _getProfileFromHandle(handle: string): Promise<Profile> {
    const query = getProfileFromHandleQuery(handle);
    const response = await this.fetch(query);
    if(response[0].length === 0) {
      throw new Error(`Invalid input: No profile found for handle: ${handle}`);
    }
    const profileId = response[0][0]["profile_id"];
    return {
      profileId: profileId,
    } as Profile;
  }

  private async _getProfileIdFromAnySources(profile: Profile): Promise<Profile> {
    let formattedProfile = {} as Profile;
    // Check if input is a valid eth address
    if (profile.profileId.match(/^0x[a-fA-F0-9]{40}$/g)) {
      formattedProfile = await this._getProfileFromAddress(profile.profileId);
    }
    // Check if input is a valid ENS
    else if (profile.profileId.match("\\.eth$")) {
      const ensProvider = new EnsProvider();
      const ethAddress = await ensProvider.resolveEnsFromJsonRpc(profile.profileId);
      if(ethAddress === "0x0000000000000000000000000000000000000000"){
        throw new Error("Invalid input: No profile found for this ENS");
      }
      formattedProfile = await this._getProfileFromAddress(ethAddress);
    }
    // Check if input is a valid lens handle
    else if (profile.profileId.match("\\.lens$")) {
      formattedProfile = await this._getProfileFromHandle(profile.profileId);
    }
    // Check if input is a valid lens profile id
    else if (profile.profileId.match(/^0x[a-fA-F0-9]{0,39}$/g)) {
      formattedProfile = profile;
    }
    // Check if input is a valid lens handle without .lens
    else {
      const forcedLensHandle = profile.profileId + ".lens";
      formattedProfile = await this._getProfileFromHandle(forcedLensHandle);
    }
    if(!formattedProfile) {
      throw new Error(`Invalid input: No profile found for ${profile.profileId}`);
    }
    return formattedProfile;
  }
}