import { gql } from "graphql-request";
import { GraphQLProvider } from "../graphql";
import { ExploreProfileType, GetFollowersType } from "./types";

export const exploreProfilesQuery = async (
  graphqlProvider: GraphQLProvider,
  cursor: string
): Promise<ExploreProfileType> => {
  return graphqlProvider.query<ExploreProfileType>(
    gql`
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
    `,
    {
      request: {
        sortCriteria: "LATEST_CREATED",
        limit: 50,
        ...(cursor ? { cursor } : {}),
      },
    }
  );
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
