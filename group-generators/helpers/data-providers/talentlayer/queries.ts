import { gql } from "graphql-request";
import { Users, Services, Reviews, UserGains } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

export const getUsersWithTalentLayerIdQuery = async (
  graphqlProvider: GraphQLProvider
): Promise<Users> => {
  return graphqlProvider.query<Users>(
    gql`
      {
        users(first: 1000, skip: 0) {
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
        users(first: 1000, skip: 0) {
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
          first: 1000
          skip: 0
          orderBy: createdAt
          orderDirection: desc
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
          first: 1000
          skip: 0
          orderBy: createdAt
          orderDirection: desc
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
      userGains(
        first: 1000
        skip: 0
        orderBy: totalGain
        orderDirection: desc
        where: { 
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
          first: 1000
          skip: 0
          orderBy: createdAt
          orderDirection: desc
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

export const getServicesInTimeframeQuery = async (
  graphqlProvider: GraphQLProvider,
  timestampStart: number,
  timestampEnd: number,
  topic: string
): Promise<Services> => {
  return graphqlProvider.query<Services>(
    gql`
    {
      services(
        first: 1000
        skip: 0
        orderBy: transaction__amount
        orderDirection: asc
        where: { 
          description_: { keywords_raw_contains: "${topic}" }
          updatedAt_gte: "${timestampStart}"
          updatedAt_lt: "${timestampEnd}"
          status: Finished
        }
      ) {
        id
        seller {
          address
        }
        transaction {
          token {
            symbol
          }
          payments {
            amount
          }
        }
      }
    }
  `
  );
};
