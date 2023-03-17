import { gql } from "graphql-request";
import { UsersType, ServicesType, ReviewsType } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

export const getUsersWithTalentLayerIdQuery = async (
  graphqlProvider: GraphQLProvider
): Promise<UsersType> => {
  return graphqlProvider.query<UsersType>(
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
): Promise<UsersType> => {
  return graphqlProvider.query<UsersType>(
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
): Promise<ServicesType> => {
  return graphqlProvider.query<ServicesType>(
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
): Promise<ServicesType> => {
  return graphqlProvider.query<ServicesType>(
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
): Promise<UsersType> => {
  return graphqlProvider.query<UsersType>(
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
  minRating: number
): Promise<ReviewsType> => {
  return graphqlProvider.query<ReviewsType>(
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
