import { GraphQLClient } from "graphql-request";
import { GetAttestationParams, QueryParams } from "./types";
import { FetchedData } from "topics/group";

export const defaultLimit = 100;

export class EthereumAttestationServiceProvider {
  public async getAttestationRecipients(
    params: GetAttestationParams
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};

    for await (const item of this._getAttestations(params)) {
      dataProfiles[item.recipient] = 1;
    }

    return dataProfiles;
  }

  public async getAttestationRecipientCount(
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
    const baseUri = `https://${
      params.network ? `${params.network}.` : ""
    }easscan.org/graphql`;
    const client = new GraphQLClient(baseUri);
    let offset = 0;
    let hasNext = true;

    while (hasNext) {
      const res = await client.request(`
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
            return v.name.toLowerCase() === params.key.toLowerCase();

          if (!params.key && params.value)
            return v.value.value.toLowerCase() === params.value.toLowerCase();

          return (
            v.name.toLowerCase() === params.key?.toLowerCase() &&
            v.value.value.toLowerCase() === params.value?.toLowerCase()
          );
        });

        return !!val;
      });

      offset += res.attestations.length;
      hasNext = res.attestations.length === defaultLimit;
    }
  }
}
