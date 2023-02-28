// import gql from graphql-request module in order to creaye a graphql request
import { gql } from "graphql-request";
// import your previously created types
import { GetPublicationStatsType, GetWhoCollectedPublicationType } from "./types";
// import the GraphQL Provider
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

// function that contains the query
export const getWhoCollectedPublicationQuery = async (
  graphqlProvider: GraphQLProvider,
  publicationId: string,
  cursor: string
): Promise<GetWhoCollectedPublicationType> => {
  // query
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
            }
          }
          ... on Comment {
            stats {
              totalAmountOfCollects
            }
          }
          ... on Mirror {
            stats {
              totalAmountOfCollects
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