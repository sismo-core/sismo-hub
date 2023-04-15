import { BigNumber, utils } from "ethers";
import { gql } from "graphql-request";
import { GetAttestationDataType, QueryParams } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

export type WagmiBytes = `0x${string}`;

export const defaultLimit = 1000;
export const getAttestationsQuery = async (
  graphqlProvider: GraphQLProvider,
  params: QueryParams
): Promise<GetAttestationDataType> => {
  const value = params.value ? parseValue(params.value) : "";
  return graphqlProvider.query<GetAttestationDataType>(
    gql`
      {
        attestations(
          first: ${params.first ?? defaultLimit}
          orderBy: index
          orderDirection: asc
          where: { 
            and: [
              { creator: "${params.creator}" }
              { index_gte: ${params.index ?? 0} }
              ${params.key ? `{ keyString: "${params.key}" }` : ""}
              ${
                params.value
                  ? `{ or: [
                  { val: "${value}" }
                  { valueString: "${params.value}" }
              ]}`
                  : ""
              }
            ]
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

function parseValue(input: string): WagmiBytes {
  input = input === "0x" ? "0x0" : input;
  if (BigNumber.isBigNumber(input)) {
    return input.toHexString() as WagmiBytes;
  }
  if (typeof input === "number" || !isNaN(Number(input))) {
    return BigNumber.from(input).toHexString() as WagmiBytes;
  }
  if (typeof input === "boolean") {
    return input ? "0x1" : "0x0";
  }
  if (utils.isAddress(input)) {
    return input as WagmiBytes;
  }
  if (utils.isHexString(input)) {
    return input as WagmiBytes;
  }
  if (typeof input === "string") {
    return utils.hexlify(utils.toUtf8Bytes(input)) as WagmiBytes;
  }

  throw new Error(`unrecognized value type '${input}'`);
}
