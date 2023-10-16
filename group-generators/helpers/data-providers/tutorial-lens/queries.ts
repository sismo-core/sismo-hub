// group-generators/helpers/data-providers/tutorial-lens/queries.ts

// import gql in order to have prettier written requests
import { gql } from "graphql-request";
// import your previously created types
import { GetPublicationStatsType, GetWhoCollectedPublicationType } from "./types";
// import the GraphQLProvider class
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
      // the request will fetch 50 data by 50
      request: {
        // the id of the Lens post
        publicationId: publicationId,
        // number of data to fetch
        limit: 50,
        // this parameter allows specifying from which index you decide to fetch the data
        // example: cursor 50 & limit 100 => you will fetch the [50;100] data
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