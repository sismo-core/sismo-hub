import { gql } from "graphql-request";
import { Service, UsersType } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

export const getUsersWithTalentLayerIdQuery = async (
  graphqlProvider: GraphQLProvider
): Promise<UsersType> => {
  return graphqlProvider.query<UsersType>(
    gql`
      query getUsersWithTalentLayerId {
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
      query getTalentLayerUsersCount {
        users {
          id
        }
      }
    `
  );
};

export const didSellerServiceBuyerQuery = async (
  graphqlProvider: GraphQLProvider,
  buyer: string
): Promise<Service> => {
  return graphqlProvider.query<Service>(
    gql`
      query didSellerServiceBuyer {
        services( where: {
          buyer_: {
            handle: ${buyer}
          },
          status: Confirmed
        }) {
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
      query getUserTotalSalary {
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
