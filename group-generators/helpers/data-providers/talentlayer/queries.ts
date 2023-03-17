import { gql } from "graphql-request";
import { Users, Services, Reviews } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

export const getUsersWithTalentLayerIdQuery = async (
  graphqlProvider: GraphQLProvider
): Promise<Users> => {
  return graphqlProvider.query<Users>(
    gql`
      {
        users {
          address
        }
      }
    `
  );
};

export const getTalentLayerUsersCountQuery = async (
  graphqlProvider: GraphQLProvider
): Promise<Users> => {
  return graphqlProvider.query<Users>(
    gql`
      {
        users {
          id
        }
      }
    `
  );
};

export const getServicesByBuyerQuery = async (
  graphqlProvider: GraphQLProvider,
  buyer: string
): Promise<Services> => {
  return graphqlProvider.query<Services>(
    gql`
      {
        services( 
          where: {
            buyer_: {
              handle: "${buyer}"
            },
            status: Confirmed
          }
        ) {
          id
          seller {
            address
          }
        }
      }
    `
  );
};

export const getServicesByTopicQuery = async (
  graphqlProvider: GraphQLProvider,
  topic: string
): Promise<Services> => {
  return graphqlProvider.query<Services>(
    gql`
      {
        services(
          where: {
            description_: { keywords_raw_contains: "${topic}" }
            status: Finished
          }
        ) {
          id
          seller {
            address
          }
        }
      }
    `
  );
};

export const getUserTotalEarnedQuery = async (
  graphqlProvider: GraphQLProvider,
  userHandle: string
): Promise<Users> => {
  return graphqlProvider.query<Users>(
    gql`
      {
        users( 
            where: { handle: "${userHandle}"} 
        ) {
          address
          totalGains {
            totalGain,
            token {
              symbol
            }
          }
        }
      }
    `
  );
};

export const getReviewsByMinRatingQuery = async (
  graphqlProvider: GraphQLProvider,
  minRating: number
): Promise<Reviews> => {
  return graphqlProvider.query<Reviews>(
    gql`
      {
        reviews(
          where: {rating_gte: ${minRating}}
        ) {
          to{
            address
          }
          service{
            seller{
              address
            }
          }
        }
      }
    `
  );
};
