import { defaultLimit, getAttestationsQuery } from "./queries";
import {
  GetAttestationParams,
  GetAttestationValueParams,
  QueryParams,
} from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class AttestationStationProvider extends GraphQLProvider {
  constructor() {
    super({
      url: "https://api.thegraph.com/subgraphs/name/wslyvh/optimism-atst",
    });
  }

  public async getAttestations(
    params: GetAttestationParams
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getAttestations(params)) {
      dataProfiles[item.receiver] = 1;
    }

    return dataProfiles;
  }

  public async getAttestationsCount(
    params: GetAttestationParams
  ): Promise<number> {
    const attestations = await this.getAttestations(params);
    return Object.keys(attestations).length;
  }

  public async getAttestationValues(
    params: GetAttestationValueParams
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getAttestations(params)) {
      const value = isNaN(Number(item.val)) ? 1 : Number(item.val);
      dataProfiles[item.receiver] = value;
    }

    return dataProfiles;
  }

  public async GetAttestationValueParams(
    params: GetAttestationValueParams
  ): Promise<number> {
    const attestations = await this.getAttestationValues(params);
    return Object.keys(attestations).length;
  }

  private async *_getAttestations(params: QueryParams) {
    let offset = 0;
    let hasNext = true;

    while (hasNext) {
      const response = await getAttestationsQuery(this, {
        ...params,
        index: offset,
      });

      yield* response.attestations;

      offset =
        response.attestations[response.attestations.length - 1]?.index ?? 0;
      hasNext = response.attestations.length === defaultLimit;
    }
  }
}
