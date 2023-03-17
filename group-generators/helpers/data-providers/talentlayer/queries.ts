import { gql } from "graphql-request";
import { Reviews, Services, Users } from "./types";
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

export const getServicesByBuyerAndSellerQuery = async (
  graphqlProvider: GraphQLProvider,
  buyer: string,
  seller: string
): Promise<Services> => {
  return graphqlProvider.query<Services>(
    gql`
      {
        services( 
          where: {
            seller_: {
              handle: "${seller}"
            },
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

export const getUserTotalSalaryQuery = async (
  graphqlProvider: GraphQLProvider,
  userAddress: string
): Promise<Users> => {
  return graphqlProvider.query<Users>(
    gql`
      {
        users( where: { handle: "${userAddress}"} ) {
          totalGains {
            totalGain,
            token {
              name,
              symbol,
              decimals
            }
          }
        }
      }
    `
  );
};

export const getReviewsByMinRatingQuery = async (
  graphqlProvider: GraphQLProvider,
  minRating: string
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
        }
      }
    `
  );
};
