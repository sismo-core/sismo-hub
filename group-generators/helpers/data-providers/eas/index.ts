import { GetAttestationParams, QueryParams, fromStringToSupportedNetwork } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export const defaultLimit = 100;

export class EthereumAttestationServiceProvider extends GraphQLProvider {
  constructor() {
    super({
      url: "https://easscan.org/graphql",
    });
  }

  public async getAttestationRecipients(
    params: GetAttestationParams
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};

    for await (const item of this._getAttestations(params)) {
      dataProfiles[item.recipient] = 1;
    }

    return dataProfiles;
  }

  public async getAttestationRecipientsCount(
    params: GetAttestationParams
  ): Promise<number> {
    const attestations = await this.getAttestationRecipients(params);
    return Object.keys(attestations).length;
  }

  public async getAttestationValues(
    params: GetAttestationParams
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};

    for await (const item of this._getAttestations(params)) {
      const value = isNaN(Number(item.value)) ? 1 : Number(item.value);
      dataProfiles[item.recipient] = value;
    }

    return dataProfiles;
  }

  public async getAttestationValuesCount(
    params: GetAttestationParams
  ): Promise<number> {
    const attestations = await this.getAttestationValues(params);
    return Object.keys(attestations).length;
  }

  private async *_getAttestations(params: QueryParams) {
    const network = fromStringToSupportedNetwork(params.network);
    if (network !== "mainnet") {
      this.graphQLClient.setEndpoint(
        `https://${network}.easscan.org/graphql`
      );
    }

    let offset = 0;
    let hasNext = true;

    while (hasNext) {
      const res = await this.graphQLClient.request(`
        {
          attestations(take: ${defaultLimit} skip: ${offset} where: {
            revoked: {
              equals: false
            }
            attester: {
              equals: "${params.attester}",
              mode: insensitive
            }
            schemaId: {
              equals: "${params.schema}",
              mode: insensitive
            }
            OR: [
              {
                expirationTime: {
                  gt: ${Math.floor(Date.now() / 1000)}
                }   
              }
              {
                expirationTime: {
                  equals: 0
                }   
              }
            ]
            }) {
            id
            attester
            recipient
            revoked
            data
            decodedDataJson
            time
            timeCreated
            schema {
              id
              schema
            }
          }
        }
      `);

      if (!params.key && !params.value) yield* res.attestations;

      yield* res.attestations.filter((i: any) => {
        const values = JSON.parse(i.decodedDataJson);
        const val = values.find((v: any) => {
          if (params.key && !params.value)
            return v.name.toString().toLowerCase() === params.key.toLowerCase();

          if (!params.key && params.value)
            return (
              v.value.value.toString().toLowerCase() ===
              params.value.toLowerCase()
            );

          return (
            v.name.toString().toLowerCase() === params.key?.toLowerCase() &&
            v.value.value.toString().toLowerCase() ===
              params.value?.toLowerCase()
          );
        });

        return !!val;
      });

      offset += res.attestations.length;
      hasNext = res.attestations.length === defaultLimit;
    }
  }
}
