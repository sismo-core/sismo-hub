import {
  exploreProfilesQuery,
  exploreRankedProfilesQuery,
  getFollowersQuery,
  getProfileWithHandleQuery,
  getWhoCollectedPublicationQuery,
  getWhoMirroredPublicationQuery,
} from "./queries";
import {
  ExploreProfileType,
  FollowerType,
  GetFollowersType,
  GetWhoCollectedPublicationType,
  GetWhoMirroredPublicationType,
  ProfileType,
  Wallet,
} from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

export class LensProvider extends GraphQLProvider {
  constructor() {
    super({
      url: "https://api.lens.dev",
    });
  }

  public async *getFollowers(
    profileId: string
  ): AsyncGenerator<FollowerType, void, undefined> {
    let cursor = "";
    let lensFollowers: GetFollowersType;
    do {
      lensFollowers = await getFollowersQuery(this, profileId, cursor);
      yield* lensFollowers.followers.items;
      cursor = lensFollowers.followers.pageInfo.next;
    } while (lensFollowers.followers.items.length > 0);
  }

  public async *exploreProfiles(): AsyncGenerator<
    ProfileType,
    void,
    undefined
  > {
    let cursor = "";
    let lensProfiles: ExploreProfileType;
    do {
      lensProfiles = await exploreProfilesQuery(this, cursor);
      yield* lensProfiles.exploreProfiles.items;
      cursor = lensProfiles.exploreProfiles.pageInfo.next;
    } while (lensProfiles.exploreProfiles.items.length > 0);
  }

  public async *exploreProfilesWithMaxRank(maxRank: number): AsyncGenerator<
    ProfileType,
    void,
    undefined
  > {
    let cursor = "";
    let counter = 0
    let lensProfiles: ExploreProfileType;
    do {
      lensProfiles = await exploreRankedProfilesQuery(this, cursor);
      yield* lensProfiles.exploreProfiles.items;
      cursor = lensProfiles.exploreProfiles.pageInfo.next;
      counter++
    } while (counter < (maxRank/50));
  }

  public async *getWhoCollectedPublication(
    publicationId: string
  ): AsyncGenerator<Wallet, void, undefined> {
    let cursor = "";
    let lensCollectors: GetWhoCollectedPublicationType;
    do {
      lensCollectors = await getWhoCollectedPublicationQuery(
        this,
        publicationId,
        cursor
      );
      yield* lensCollectors.whoCollectedPublication.items;
      cursor = lensCollectors.whoCollectedPublication.pageInfo.next;
    } while (lensCollectors.whoCollectedPublication.items.length > 0);
  }

  public async *getWhoMirroredPublication(
    whoMirroredPublicationId: string
  ): AsyncGenerator<ProfileType, void, undefined> {
    let cursor = "";
    let lensMirrorers: GetWhoMirroredPublicationType;
    do {
      lensMirrorers = await getWhoMirroredPublicationQuery(
        this,
        whoMirroredPublicationId,
        cursor
      );
      yield* lensMirrorers.profiles.items;
      cursor = lensMirrorers.profiles.pageInfo.next;
    } while (lensMirrorers.profiles.items.length > 0);
  }

  public async *getProfileWithHandles(
    handles: string[]
  ) : AsyncGenerator<ProfileType, void, undefined>{
    for (const handle of handles) {
      const profile = await getProfileWithHandleQuery(this, handle)
      yield profile
    }
  }
}