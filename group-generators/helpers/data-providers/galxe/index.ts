import { gql } from "graphql-request";
import {
  QueryCampaignOutput,
  QueryCampaignInput,
  IGalxeProvider,
} from "./types";

import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class GalxeProvider extends GraphQLProvider implements IGalxeProvider {
  constructor() {
    super({ url: "https://graphigo.prd.galaxy.eco/query" });
  }

  public async getCampaignHolders({
    id,
  }: QueryCampaignInput): Promise<FetchedData> {
    const holders: FetchedData = {};

    try {
      const query = gql`
        query Campaign {
        campaign(id: "${id}") {
          id
          status
          numNFTMinted
          holdersList
        }
      }
    `;

      const response: QueryCampaignOutput =
        await this.query<QueryCampaignOutput>(query);

      for (const holder of response.campaign.holdersList) {
        holders[holder] = 1;
      }
    } catch (error) {
      console.error(error);
    }
    return holders;
  }

  public async getCampaignHoldersCount({
    id,
  }: QueryCampaignInput): Promise<number> {
    const holders = await this.getCampaignHolders({ id });
    return Object.keys(holders).length;
  }
}
