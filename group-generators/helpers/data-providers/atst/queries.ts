import { gql } from "graphql-request";
import { GetAttestationDataType, QueryParams } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

export const defaultLimit = 1000;
export const getAttestationsQuery = async (
  graphqlProvider: GraphQLProvider,
  params: QueryParams
): Promise<GetAttestationDataType> => {
  return graphqlProvider.query<GetAttestationDataType>(
    gql`
      {
        attestations(
          first: ${params.first ?? defaultLimit}
          orderBy: index
          orderDirection: asc
          where: { 
            creator: "${params.creator}"
            ${params.key ? `keyString: "${params.key}"` : ""}
            ${params.value ? `valueString: "${params.value}"` : ""}
            index_gte: ${params.index ?? 0}
          }
        ) {
          id
          index
          creator
          receiver
          keyString
          val
          valueString
        }
      }
    `
  );
};
