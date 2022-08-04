import { exploreProfilesQuery, getFollowersQuery } from "./queries";
import {
  ExploreProfileType,
  FollowerType,
  GetFollowersType,
  ProfileType,
} from "./types";
import { GraphQLProvider } from "@group-generators/helpers/providers/graphql";

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
}
