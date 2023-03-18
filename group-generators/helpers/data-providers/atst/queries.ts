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
          skip: ${params.skip ?? 0}
          orderBy: blockTimestamp
          orderDirection: desc
          where: { keyString: "${params.key}", valueString: "${params.value}" }
        ) {
          id
          creator
          receiver
          keyString
          valueString
        }
      }
    `
  );
};
