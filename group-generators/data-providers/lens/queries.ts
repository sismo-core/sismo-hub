import { gql } from "graphql-request";
import {
  ExploreProfileType,
  GetFollowersCountType,
  GetFollowersType,
  GetPublicationStatsType,
  GetWhoCollectedPublicationType,
  GetWhoMirroredPublicationType,
  ProfileType,
} from "./types";
import { GraphQLProvider } from "@group-generators/data-providers/graphql";

const exploreProfiles = gql`
  query ExploreProfiles($request: ExploreProfilesRequest!) {
    exploreProfiles(request: $request) {
      items {
        handle
        ownedBy
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

export const exploreProfilesQuery = async (
  graphqlProvider: GraphQLProvider,
  cursor: string
): Promise<ExploreProfileType> => {
  return graphqlProvider.query<ExploreProfileType>(exploreProfiles, {
    request: {
      sortCriteria: "LATEST_CREATED",
      limit: 50,
      ...(cursor ? { cursor } : {}),
    },
  });
};

export const exploreRankedProfilesQuery = async (
  graphqlProvider: GraphQLProvider,
  cursor: string
): Promise<ExploreProfileType> => {
  return graphqlProvider.query<ExploreProfileType>(exploreProfiles, {
    request: {
      sortCriteria: "MOST_FOLLOWERS",
      limit: 50,
      ...(cursor ? { cursor } : {}),
    },
  });
};

export const getFollowersQuery = async (
  graphqlProvider: GraphQLProvider,
  profileId: string,
  cursor: string
): Promise<GetFollowersType> => {
  return graphqlProvider.query<GetFollowersType>(
    gql`
      query followers($request: FollowersRequest!) {
        followers(request: $request) {
          items {
            wallet {
              address
            }
          }
          pageInfo {
            prev
            next
            totalCount
          }
        }
      }
    `,
    {
      request: {
        profileId: profileId,
        limit: 50,
        ...(cursor ? { cursor } : {}),
      },
    }
  );
};

export const getFollowersCountQuery = async (
  graphqlProvider: GraphQLProvider,
  profileId: string
): Promise<GetFollowersCountType> => {
  console.log("profileId", profileId);
  return graphqlProvider.query<GetFollowersCountType>(
    gql`
      query Profile($request: SingleProfileQueryRequest!) {
        profile(request: $request) {
          stats {
            totalFollowers
          }
        }
      }
    `,
    {
      request: {
        profileId: profileId,
      },
    }
  );
};

export const getWhoCollectedPublicationQuery = async (
  graphqlProvider: GraphQLProvider,
  publicationId: string,
  cursor: string
): Promise<GetWhoCollectedPublicationType> => {
  return graphqlProvider.query<GetWhoCollectedPublicationType>(
    gql`
      query whoCollectedPublication($request: WhoCollectedPublicationRequest!) {
        whoCollectedPublication(request: $request) {
          items {
            address
          }
          pageInfo {
            prev
            next
            totalCount
          }
        }
      }
    `,
    {
      request: {
        publicationId: publicationId,
        limit: 50,
        ...(cursor ? { cursor } : {}),
      },
    }
  );
};

export const getPublicationStatsQuery = async (
  graphqlProvider: GraphQLProvider,
  publicationId: string
): Promise<GetPublicationStatsType> => {
  return graphqlProvider.query<GetPublicationStatsType>(
    gql`
      query PublicationStats($request: PublicationQueryRequest!) {
        publication(request: $request) {
          ... on Post {
            stats {
              totalAmountOfCollects
              totalAmountOfMirrors
              totalAmountOfComments
            }
          }
          ... on Comment {
            stats {
              totalAmountOfCollects
              totalAmountOfMirrors
              totalAmountOfComments
            }
          }
          ... on Mirror {
            stats {
              totalAmountOfCollects
              totalAmountOfMirrors
              totalAmountOfComments
            }
          }
        }
      }
    `,
    {
      request: {
        publicationId: publicationId,
      },
    }
  );
};

export const getWhoMirroredPublicationQuery = async (
  graphqlProvider: GraphQLProvider,
  whoMirroredPublicationId: string,
  cursor: string
): Promise<GetWhoMirroredPublicationType> => {
  return graphqlProvider.query<GetWhoMirroredPublicationType>(
    gql`
      query profiles($request: ProfileQueryRequest!) {
        profiles(request: $request) {
          items {
            ownedBy
          }
          pageInfo {
            prev
            next
            totalCount
          }
        }
      }
    `,
    {
      request: {
        whoMirroredPublicationId: whoMirroredPublicationId,
        limit: 50,
        ...(cursor ? { cursor } : {}),
      },
    }
  );
};

export const getProfileWithHandleQuery = async (
  graphqlProvider: GraphQLProvider,
  handle: string
) => {
  return graphqlProvider.query<{ profile: ProfileType }>(
    gql`
      query profile($request: SingleProfileQueryRequest!) {
        profile(request: $request) {
          id
          handle
          ownedBy
        }
      }
    `,
    {
      request: {
        handle,
      },
    }
  );
};

export const getDefaultProfileWithEthAddressQuery = async (
  graphqlProvider: GraphQLProvider,
  ethereumAddress: string
) => {
  return graphqlProvider.query<{ defaultProfile: ProfileType }>(
    gql`
      query defaultProfile($request: DefaultProfileRequest!) {
        defaultProfile(request: $request) {
          id
          handle
          ownedBy
        }
      }
    `,
    {
      request: {
        ethereumAddress,
      },
    }
  );
};
