import { gql } from "graphql-request";
import { Users } from "./types";
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
