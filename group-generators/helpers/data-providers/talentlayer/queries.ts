import { gql } from "graphql-request";
import { Service, Users } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

export const getUsersWithTalentLayerIdQuery = async (
  graphqlProvider: GraphQLProvider
): Promise<Users> => {
  return graphqlProvider.query<Users>(
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
): Promise<Users> => {
  return graphqlProvider.query<Users>(
    gql`
      query getTalentLayerUsersCount {
        users {
          id
        }
      }
    `
  );
};

export const didSellerWorkForBuyerQuery = async (
  graphqlProvider: GraphQLProvider,
  buyer: string,
  seller: string
): Promise<Service> => {
  return graphqlProvider.query<Service>(
    gql`
      query didSellerWorkForBuyer {
        {
          services(where: {
            seller_: {
              handle: ${seller}
            },
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
      }
    `
  );
};
