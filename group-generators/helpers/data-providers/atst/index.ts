import { defaultLimit, getAttestationsQuery } from "./queries";
import { GetAttestationParams, QueryParams } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class AttestationStationProvider extends GraphQLProvider {
  constructor() {
    super({
      url: "https://api.thegraph.com/subgraphs/name/wslyvh/optimism-atst",
    });
  }

  public async getAttestations({
    key,
    value,
  }: GetAttestationParams): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getAttestations({ key, value })) {
      dataProfiles[item.receiver] = 1;
    }

    return dataProfiles;
  }

  public async getAttestationsCount({
    key,
    value,
  }: GetAttestationParams): Promise<number> {
    const attestations = await this.getAttestations({ key, value });
    return Object.keys(attestations).length;
  }

  private async *_getAttestations(params: QueryParams) {
    let offset = 0;
    let hasNext = true;

    while (hasNext) {
      const response = await getAttestationsQuery(this, {
        ...params,
        skip: offset,
      });

      yield* response.attestations;

      offset += defaultLimit;
      hasNext = response.attestations.length === defaultLimit;
    }
  }
}
