import readline from "readline";
import {
  exploreProfilesQuery,
  exploreRankedProfilesQuery,
  getDefaultProfileWithEthAddressQuery,
  getFollowersCountQuery,
  getFollowersQuery,
  getProfileWithHandleQuery,
  getPublicationStatsQuery,
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
  ProfileId,
  PublicationId,
  Wallet,
} from "./types";
import { EnsProvider } from "@group-generators/helpers/data-providers/ens";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { retryRequest } from "@group-generators/helpers/data-providers/utils/utils";
import { FetchedData } from "topics/group";

export class LensProvider extends GraphQLProvider {
  constructor() {
    super({
      url: "https://api.lens.dev",
    });
  }

  public async getFollowers(profileId: ProfileId): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getFollowers(profileId)) {
      dataProfiles[item.wallet.address] = 1;
    }
    return dataProfiles;
  }

  public async getFollowersCount(profileId: ProfileId): Promise<number> {
    const resolvedProfileId = await this._getProfileIdFromAnySources(
      profileId.profileId
    );
    const lensFollowers = await getFollowersCountQuery(this, resolvedProfileId);
    return lensFollowers.profile.stats.totalFollowers;
  }

  public async getWhoCollectedPublication(
    publication: PublicationId
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getWhoCollectedPublication(publication)) {
      dataProfiles[item.address] = 1;
    }
    return dataProfiles;
  }

  public async getPublicationCollectorsCount(
    publication: PublicationId
  ): Promise<number> {
    const publicationStats = await getPublicationStatsQuery(
      this,
      publication.publicationId
    );
    return publicationStats.publication.stats.totalAmountOfCollects;
  }

  public async getWhoMirroredPublication(
    publication: PublicationId
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getWhoMirroredPublication(publication)) {
      dataProfiles[item.ownedBy] = 1;
    }
    return dataProfiles;
  }

  public async getPublicationMirrorsCount(
    publication: PublicationId
  ): Promise<number> {
    const publicationStats = await getPublicationStatsQuery(
      this,
      publication.publicationId
    );
    return publicationStats.publication.stats.totalAmountOfMirrors;
  }

  private async *_getFollowers({
    profileId,
  }: ProfileId): AsyncGenerator<FollowerType, void, undefined> {
    let cursor = "";
    let lensFollowers: GetFollowersType;

    const resolvedProfileId = await this._getProfileIdFromAnySources(profileId);

    do {
      lensFollowers = await getFollowersQuery(this, resolvedProfileId, cursor);
      yield* lensFollowers.followers.items;
      cursor = lensFollowers.followers.pageInfo.next;
    } while (lensFollowers.followers.items.length > 0);
  }

  public async getAllProfiles(): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    let profileChunks = [];
    let profilesFetched = 0;
    let continueFetch = true;
    let offset = 0;
    const chunks = 50;
    const offsetAdd = 500;

    while (continueFetch) {
      profileChunks = [];
      for (let i = offset; i <= offset + offsetAdd; i += chunks) {
        profileChunks.push('{"offset":' + i + "}");
      }
      offset += offsetAdd;

      const profileChunksPromise = profileChunks.map((chunk) =>
        retryRequest(this, exploreProfilesQuery, chunk, 5)
      );
      await Promise.all(profileChunksPromise)
        .then((profiles) => {
          for (const profile of profiles) {
            if (profile == null || profile.exploreProfiles.items.length == 0) {
              continueFetch = false;
            }
            for (const item of profile.exploreProfiles.items) {
              dataProfiles[item.ownedBy] = 1;
              profilesFetched++;
            }
          }
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`Lens profiles fetched: ${profilesFetched}`);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
    readline.cursorTo(process.stdout, 0);
    process.stdout.write("\n");

    return dataProfiles;
  }

  public async *exploreProfilesWithMaxRank(
    maxRank: number
  ): AsyncGenerator<ProfileType, void, undefined> {
    let cursor = "";
    let counter = 0;
    let lensProfiles: ExploreProfileType;
    do {
      lensProfiles = await exploreRankedProfilesQuery(this, cursor);
      yield* lensProfiles.exploreProfiles.items;
      cursor = lensProfiles.exploreProfiles.pageInfo.next;
      counter++;
    } while (counter < maxRank / 50);
  }

  private async *_getWhoCollectedPublication({
    publicationId,
  }: PublicationId): AsyncGenerator<Wallet, void, undefined> {
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

  private async *_getWhoMirroredPublication({
    publicationId,
  }: PublicationId): AsyncGenerator<ProfileType, void, undefined> {
    let cursor = "";
    let lensMirrorers: GetWhoMirroredPublicationType;
    do {
      lensMirrorers = await getWhoMirroredPublicationQuery(
        this,
        publicationId,
        cursor
      );
      yield* lensMirrorers.profiles.items;
      cursor = lensMirrorers.profiles.pageInfo.next;
    } while (lensMirrorers.profiles.items.length > 0);
  }

  public async *getProfileWithHandles(
    handles: string[]
  ): AsyncGenerator<ProfileType, void, undefined> {
    for (const handle of handles) {
      const profile = await getProfileWithHandleQuery(this, handle);
      yield profile.profile;
    }
  }

  private async _getDefaultProfileWithEthAddress(
    ethereumAddress: string
  ): Promise<ProfileType> {
    const response = await getDefaultProfileWithEthAddressQuery(
      this,
      ethereumAddress
    );
    return response.defaultProfile;
  }

  /**
   * Use this method to resolve a lens profile id from either an ethereum address, a lens profile id, a lens handle, a ens name.
   * @param input A string from either a ethereum address, a lens profile id, a lens handle, a ens name.
   * @returns The lens profile id as a string.
   */
  public async _getProfileIdFromAnySources(input: string): Promise<string> {
    try {
      // Check if input is a valid eth address
      if (input.match(/^0x[a-fA-F0-9]{40}$/g)) {
        const profile = await this._getDefaultProfileWithEthAddress(input);
        if (profile?.id) {
          return profile.id;
        } else {
          throw new Error("No profile found for this ethereum address");
        }
      }
      // Check if input is a valid lens profile id
      if (input.match(/^0x[a-fA-F0-9]{0,39}$/g)) {
        return input;
      }
      // Check if input is a valid lens handle
      if (input.includes(".lens")) {
        const response = await getProfileWithHandleQuery(this, input);
        if (response?.profile?.id) {
          return response.profile.id;
        } else {
          throw new Error("No profile found for this Lens handle");
        }
      }
      // Check if input is a valid ens name
      if (input.includes(".eth")) {
        const ensProvider = new EnsProvider();
        const ethAddress = await ensProvider.resolveEnsFromJsonRpc(input);
        const profile = await this._getDefaultProfileWithEthAddress(ethAddress);

        if (profile?.id) {
          return profile.id;
        } else {
          throw new Error("No profile found for this ENS");
        }
      } else {
        throw new Error("Invalid input format");
      }
    } catch (err) {
      throw new Error("Invalid input");
    }
  }
}
