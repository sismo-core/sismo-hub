import { gql } from "graphql-request";
import { Users, Services, Reviews, UserGains } from "./types";
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

export const getFinishedServicesByBuyerQuery = async (
  graphqlProvider: GraphQLProvider,
  buyerHandle: string
): Promise<Services> => {
  return graphqlProvider.query<Services>(
    gql`
      {
        services( 
          where: {
            buyer_: {
              handle: "${buyerHandle}"
            },
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

export const getFinishedServicesByTopicQuery = async (
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
  tokenSymbol: string
): Promise<UserGains> => {
  return graphqlProvider.query<UserGains>(
    gql`
    {
      userGains( where:
        { 
          token_: {symbol: "${tokenSymbol}"}
        }
      ) {
        user{
          address
        },
        totalGain,
        token {
          name,
          symbol,
          decimals
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
